package project2.SAYO.domain.user.service;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project2.SAYO.config.AES128Config;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.enums.ProfileImage;
import project2.SAYO.domain.user.repository.UserRepository;
import project2.SAYO.global.auth.dto.TokenDto;
import project2.SAYO.global.auth.jwt.TokenProvider;
import project2.SAYO.global.auth.userDetails.AuthUser;
import project2.SAYO.global.email.event.UserRegistrationApplicationEvent;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;
import project2.SAYO.global.oauth.OAuthUserProfile;
import project2.SAYO.global.redis.RedisDao;
import project2.SAYO.global.util.CustomAuthorityUtils;
import project2.SAYO.global.util.CustomBeanUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static project2.SAYO.domain.user.entity.User.OAuthStatus.NORMAL;
import static project2.SAYO.domain.user.entity.User.OAuthStatus.OAUTH;

@Service
@Slf4j
@RequiredArgsConstructor
//@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final CustomBeanUtils<User> beanUtils;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final TokenProvider tokenProvider;
    private final RedisDao redisDao;
    private final ApplicationEventPublisher publisher;
    private final AES128Config aes128Config;

    public User createUser(User user){
        verifyExistsEmail(user.getEmail());
        makeSecretPassword(user);

        // 관리자 이메일일 경우 권한 부여, 이외에는 USER 권한 부여
        if(user.getEmail().equals("admin@gmail.com")) {
            user.setRoles(List.of("ADMIN"));
        }else {
            user.setRoles(List.of("USER"));
        }
        // 회원상태 활동중 부여
        user.changeUserStatus(User.UserStatus.USER_ACTIVE);
        user.setOAuthStatus(NORMAL);
        createRoles(user);

        User saveUser = userRepository.save(user);
        // 회원가입 시 이메일 발송(계정 경로에 한글이 있는 경우 사용 불가능)
        publisher.publishEvent(new UserRegistrationApplicationEvent(this, saveUser));
        return saveUser;
    }

    // OAuth2 인증 완료후 회원가입 및 업데이트
    public User createOauth2User(OAuthUserProfile userProfile, List<String> roles) {
        Optional<User> user = userRepository.findByEmail(userProfile.getEmail());
        if(user.isPresent()) {
            if(user.get().getOAuthStatus().equals(OAUTH)) {
                return user
                        .map(u -> u.oauthUpdate(userProfile.getName(), userProfile.getEmail(), userProfile.getImage(), roles,OAUTH))
                        .orElse(null);
            } else {
                throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
            }
        } else {
            User oauth2User = userProfile.createOauth2User(userProfile.getName(), userProfile.getEmail(), userProfile.getImage(), roles,OAUTH);
            return userRepository.save(oauth2User);
        }
    }

    public User updateUser(User user, Long userId) {
        User findUser = findVerifiedUser(userId);

        Optional.ofNullable(user.getProfile().getNickname())
                .ifPresent(nickname -> findUser.getProfile().setNickname(nickname));
        Optional.ofNullable(user.getProfile().getAddress())
                .ifPresent(address -> findUser.getProfile().setAddress(address));
        Optional.ofNullable(user.getProfile().getImage())
                .ifPresent(image -> findUser.getProfile().setImage(image));
        Optional.ofNullable(user.getProfile().getIntroduction())
                .ifPresent(introduction -> findUser.getProfile().setIntroduction(introduction));
        return findUser;
    }

    public void deleteUser(Long userId) {
        User findUser = findVerifiedUser(userId);
        findUser.changeUserStatus(User.UserStatus.USER_QUIT);
        userRepository.save(findUser);
    }

    public ProfileImage createProfileImage(User user){
        ProfileImage[] randomImageList = ProfileImage.values();
        Long profileImageIndex = Long.valueOf((int) ((Math.random() * 10)) % 7 +1);

        List<ProfileImage> profileImageList = Arrays.stream(randomImageList)
                .filter(image -> image.getIndex() == profileImageIndex)
                .collect(Collectors.toList());

        ProfileImage profileImage = profileImageList.get(0);
        user.getProfile().setImage(profileImage.getUrl());
        return profileImage;
    }

    public void reissueAccessToken(HttpServletRequest request, HttpServletResponse response){
        String secretRefreshToken = tokenProvider.resolveRefreshToken(request);
        validatedRefreshToken(secretRefreshToken);
        String accessToken = tokenProvider.resolveAccessToken(request);
        log.info("accessToken ={}",accessToken);
        String refreshToken = aes128Config.decryptAes(secretRefreshToken);
        log.info("refreshToken = {}",refreshToken);
        String redisAccessToken = redisDao.getValues(refreshToken);
        log.info("redisAccessToken = {}", redisAccessToken);

        // Refresh Token이 Redis에 존재할 경우 Access Token 생성
        if(redisDao.validateValue(redisAccessToken) && accessToken.equals(redisAccessToken)){
            log.info("# RefreshToken을 통한 AccessToken 재발급 시작");
            Claims claims = tokenProvider.parseClaims(refreshToken); // Refresh Token 복호화
            String email = claims.get("sub", String.class); // Refresh Token에서 email정보 가져오기
            User user = findVerifiedUser(email); // DB에서 사용자 정보 찾기
            AuthUser authUser = AuthUser.of(user.getId(), user.getEmail(), user.getRoles());
            TokenDto tokenDto = tokenProvider.generateTokenDto(authUser); // Token 만들기
            int refreshTokenExpirationMinutes = tokenProvider.getRefreshTokenExpirationMinutes();
            redisDao.setValues(refreshToken, tokenDto.getAccessToken(),
                    Duration.ofMinutes(refreshTokenExpirationMinutes));
            tokenProvider.accessTokenSetHeader(tokenDto.getAccessToken(),response);

        } else if(!redisDao.validateValue(redisAccessToken)){
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_FOUND);
        } else {
            throw new BusinessLogicException(ExceptionCode.TOKEN_IS_NOT_SAME);
        }
    }

    public void logout(HttpServletRequest request){
        String secretRefreshToken = tokenProvider.resolveRefreshToken(request);
        validatedRefreshToken(secretRefreshToken);
        String refreshToken = aes128Config.decryptAes(secretRefreshToken);
        String redisAccessToken = redisDao.getValues(refreshToken);
        if(redisDao.validateValue(redisAccessToken)){
            redisDao.deleteValues(refreshToken);
        }
        deleteValuesCheck(refreshToken);
        log.info("로그아웃 서비스로직 수행 완료!");
    }

    public User findUser(long userId, long loginUserId){
        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(loginUserId != userId) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }

        return findVerifiedUser(userId);
    }

    public List<User> findUsers() {
        return userRepository.findAll();
    }


    public void verifiedUserId(Long userId, Long loginUserId){
        if(userId.longValue() != loginUserId.longValue()){
            log.info("userId = {}, loginUserId = {}",userId,loginUserId);
            throw new BusinessLogicException(ExceptionCode.USER_IS_NOT_SAME);
        }
    }

    public User findVerifiedUser(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    public User findVerifiedUser(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        return optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }


    private void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }

    public void validatedRefreshToken(String refreshToken){
        if(refreshToken == null){
            throw new BusinessLogicException(ExceptionCode.HEADER_REFRESH_TOKEN_NOT_FOUND);
        }
    }

    public void deleteValuesCheck(String refreshToken){
        String redisAccessToken = redisDao.getValues(refreshToken);
        if(redisAccessToken != null){
            throw new BusinessLogicException(ExceptionCode.TOKEN_DELETE_FAIL);
        }
    }

    private void createRoles(User user){
        log.info("## 1111 user.getRoles().get(0) = {}", user.getRoles().get(0));

        List<String> roles = authorityUtils.createRoles(user.getRoles().get(0));

        log.info("## roles = {}", Arrays.asList(roles));
        if(roles == null){
            throw new BusinessLogicException(ExceptionCode.USER_ROLE_DOES_NOT_HAVE);
        }
        user.setRoles(roles);
        createProfileImage(user);
    }

    public void makeSecretPassword(User user) {
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
    }
    @Transactional
    public void emailVerifyFailed(Long id) {
        User verifiedUser = findVerifiedUser(id);

        userRepository.delete(verifiedUser);
    }
}

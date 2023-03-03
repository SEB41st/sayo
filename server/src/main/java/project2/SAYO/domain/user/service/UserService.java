package project2.SAYO.domain.user.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import project2.SAYO.domain.user.dto.UserDto;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.repository.UserRepository;
import project2.SAYO.global.auth.authority.CustomAuthorityUtils;
import project2.SAYO.global.auth.jwt.JwtTokenizer;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;
import project2.SAYO.global.util.CustomBeanUtils;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final CustomBeanUtils<User> beanUtils;

    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final JwtTokenizer jwtTokenizer;
    private final RedisTemplate redisTemplate;

    public User createUser(User user){
        verifyExistsEmail(user.getEmail());
        String encryptPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptPassword);

        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

        return userRepository.save(user);
    }

    public UserDto.TokenInfo reissue (UserDto.Reissue reissue) {
        // 1. Refresh Token 검증
        if (!jwtTokenizer.validateToken(reissue.getRefreshToken())) {
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_ALLOW);
        }
        // 2. Access Token 에서 User email 을 가져옵니다.
        Authentication authentication = jwtTokenizer.getAuthentication(reissue.getAccessToken());

        // 3. Redis 에서 User email 을 기반으로 저장된 Refresh Token 값을 가져옵니다.
        String refreshToken = (String)redisTemplate.opsForValue().get(authentication.getName());

        // (추가) 로그아웃되어 Redis 에 RefreshToken 이 존재하지 않는 경우 처리
        if(ObjectUtils.isEmpty(refreshToken)) {
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_FOUND);
        }
        if(!refreshToken.equals(reissue.getRefreshToken())){
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_EQUAL);
        }

        // 4. 새로운 토큰 생성
        UserDto.TokenInfo tokenInfo = jwtTokenizer.generateToken(authentication);

        // 5. RefreshToken Redis 업데이트
        redisTemplate.opsForValue()
                .set(authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        return tokenInfo;
    }
    public void logout(UserDto.Logout logout) {
        // 1. Access Token 검증
        log.info("## logout.getAccessToken = {}",logout.getAccessToken());

        if (!jwtTokenizer.validateToken(logout.getAccessToken())) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_NOT_ALLOW);
        }
        // 2. Access Token 에서 User email 을 가져옵니다.
        Authentication authentication = jwtTokenizer.getAuthentication(logout.getAccessToken());

        // 3. Redis 에서 해당 User email 로 저장된 Refresh Token 이 있는지 여부를 확인 후 있을 경우 삭제합니다.
        if (redisTemplate.opsForValue().get(authentication.getName()) != null) {
            // Refresh Token 삭제
            redisTemplate.delete(authentication.getName());
        }

        // 4. 해당 Access Token 유효시간 가지고 와서 BlackList 로 저장하기
        Long expiration = jwtTokenizer.getExpiration(logout.getAccessToken());
        redisTemplate.opsForValue()
                .set(logout.getAccessToken(), "logout", expiration, TimeUnit.MILLISECONDS);
    }

    public boolean prevModify(String memberPw, String prePw) {

        if(passwordEncoder.matches(prePw, memberPw)) {
            log.info("pw 재확인 완료.. !!!!");
            return true;
        }
        else {
            return false;
        }
    }

    public User updateUser(User user) {
        User findUser = findVerifiedUser(user.getUserId());

        // todo getCurrentUser
        if (getCurrentUser().getUserId() != findUser.getUserId()) {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_ALLOW);
        }

        User updateUser = beanUtils.copyNonNullProperties(user, findUser);

        // todo password encoder update password
        String encryptPassword = passwordEncoder.encode(updateUser.getPassword());
        updateUser.setPassword(encryptPassword);

        return userRepository.save(updateUser);
    }

    public User findUser(Long userId) {
        return findVerifiedUser(userId);
    }

    public Page<User> findUsers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size, Sort.by("userId").descending()));
    }


    public void verifiedUserId(Long userId, Long loginUserId){
        if(userId.longValue() != loginUserId.longValue()){
            log.info("userId = {}, loginUserId = {}",userId,loginUserId);
            // throw new BusinessLogicException(ExceptionCode.USER_IS_NOT_SAME);
        }
    }

    public User findVerifiedUser(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }


    private void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
    }

    public void deleteUser(Long userId) {
        User findUser = findVerifiedUser(userId);
        findUser.ChangeUserStatus(User.UserStatus.USER_QUIT);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || authentication.getName() == null || authentication.getName().equals("anonymousUser"))
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        Optional<User> optionalUser = userRepository.findByEmail(authentication.getName());
        User user = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        log.info("# 현재 사용자 ={}",user.getUserId());

        return user;
    }

}

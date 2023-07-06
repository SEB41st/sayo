package project2.SAYO.global.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.transaction.annotation.Transactional;
import project2.SAYO.config.AES128Config;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.service.UserService;
import project2.SAYO.global.auth.dto.LoginDto;
import project2.SAYO.global.auth.dto.TokenDto;
import project2.SAYO.global.auth.jwt.TokenProvider;
import project2.SAYO.global.auth.userDetails.AuthUser;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;
import project2.SAYO.global.redis.RedisDao;
import project2.SAYO.global.util.Responder;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;

@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final TokenProvider tokenProvider;
    private final RedisDao redisDao;
    private final AES128Config aes128Config;

    /*
     * Spring Security의 인증처리에서 토큰 생성부분을 가로채서 만듬.
     * 인증 위임을 해당 메서드가 오버라이딩해서 대신 객체를 전달해줌
     * */

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
                                   UserService userService,
                                   TokenProvider tokenProvider,
                                   RedisDao redisDao,
                                   AES128Config aes128Config) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.redisDao = redisDao;
        this.aes128Config = aes128Config;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();
        // ServletInputSteam을 LoginDto 클래스 객체로 역직렬화 (즉, JSON 객체꺼냄)

        try{
            LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
            log.info("# attemptAuthentication : loginDto.getEmail={}, login.getPassword={}",
                    loginDto.getEmail(),loginDto.getPassword());
            User user =userService.findVerifiedUser(loginDto.getEmail());

            log.info("## longinUser Status = {}", user.getUserStatus());
            log.info("## equalsStatus = {}", user.getUserStatus().equals(User.UserStatus.USER_QUIT));


            if(user.getUserStatus().equals(User.UserStatus.USER_QUIT)) {
                throw new BusinessLogicException(ExceptionCode.USER_NOT_ACTIVE);
            } // 회원의 상태가 휴면중이거나 삭제했다면 로그인 실패

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

            return authenticationManager.authenticate(authenticationToken);
        }catch(Exception e){
            response.setStatus(HttpStatus.UNAUTHORIZED.value()); // 예시로 UNAUTHORIZED 상태 코드 반환
            response.getWriter().write("탈퇴한 회원입니다. 재가입을 원하실 경우 관리자에게 문의해 주세요."); // 예시로 사용자 정의 에러 메시지 반환
            response.getWriter().flush();
            return null; // 예외 처리 후 Authentication 객체를 반환하지 않음
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException{
        AuthUser authUser = (AuthUser) authResult.getPrincipal();
        TokenDto tokenDto = tokenProvider.generateTokenDto(authUser);
        String accessToken = tokenDto.getAccessToken(); // accessToken 만들기

        /*if(authUser.getUserStatus() == User.UserStatus.USER_QUIT || authUser.getUserStatus() == User.UserStatus.USER_SLEEP) {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_ACTIVE);
        } // 회원의 상태가 휴면중이거나 삭제했다면 로그인 실패*/

        String refreshToken = tokenDto.getRefreshToken(); // refreshToken 만들기
        String secretRefreshToken = aes128Config.encryptAes(refreshToken); // refreshToken 암호화

        tokenProvider.accessTokenSetHeader(accessToken, response);
        tokenProvider.refreshTokenSetHeader(secretRefreshToken, response);
//      tokenProvider.refreshTokenSetCookie(refreshToken,response); // RefreshToken Cookie로 설정

        User findUser = userService.findVerifiedUser(authUser.getId());
        Responder.loginSuccessResponse(response, findUser);// login 완료시 Response 응답 만들기

        // 로그인 성공시 Refresh Token Redis 저장 ( key = Refresh Token / value = Access Token )
        int refreshTokenExpirationMinutes = tokenProvider.getRefreshTokenExpirationMinutes();
        redisDao.setValues(refreshToken,accessToken, Duration.ofMinutes(refreshTokenExpirationMinutes));

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }


}

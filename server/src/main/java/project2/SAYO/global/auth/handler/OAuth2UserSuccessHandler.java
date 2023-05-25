package project2.SAYO.global.auth.handler;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import project2.SAYO.config.AES128Config;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.service.UserService;
import project2.SAYO.global.auth.dto.TokenDto;
import project2.SAYO.global.auth.jwt.TokenProvider;
import project2.SAYO.global.auth.userDetails.AuthUser;
import project2.SAYO.global.oauth.OAuthAttributes;
import project2.SAYO.global.oauth.OAuthCustomUser;
import project2.SAYO.global.oauth.OAuthUserProfile;
import project2.SAYO.global.redis.RedisDao;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
public class OAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenProvider tokenProvider;
    private final UserService userService;
    private final RedisDao redisDao;
    private final AES128Config aes128Config;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authResult) throws IOException, ServletException {

        // OAuth2User oAuth2User = (DefaultOAuth2User) authResult.getPrincipal(); // 기본 구현체 반환하는법!!
        OAuthCustomUser oAuthCustomUser = (OAuthCustomUser) authResult.getPrincipal();
        Map<String, Object> attributes = oAuthCustomUser.getAttributes();
        String registrationId = oAuthCustomUser.getName();
        List<GrantedAuthority> authorities = (List<GrantedAuthority>) oAuthCustomUser.getAuthorities();


        List<String> roles = authorities.stream()
                .map(authority -> {
                    return authority.getAuthority().substring(5);
                })
                .collect(Collectors.toList());

        OAuthUserProfile oAuthUserProfile = OAuthAttributes.extract(registrationId, attributes); // OAuth2Profile 생성
        User user = userService.createOauth2User(oAuthUserProfile, roles); // DB에 권한과 정보 저장 (권한은 1:N 테이블로 설계)
        AuthUser authUser = AuthUser.of(user);
        Long userId = authUser.getId();

        log.info("# OAuth2.0 AuthenticationSuccess !");

        TokenDto tokenDto = tokenProvider.generateTokenDto(authUser);
        String accessToken = tokenDto.getAccessToken(); // accessToken 만들기
        String refreshToken = tokenDto.getRefreshToken(); // refreshToken 만들기

        log.info("# OAuth2.0 Token generated complete!");

        // 리다이렉트를 하기위한 정보들을 보내줌
        redirect(request,response,accessToken,refreshToken, userId);
    }

    private void redirect(HttpServletRequest request,
                          HttpServletResponse response,
                          String accessToken,
                          String refreshToken,
                          Long userId) throws IOException {

        // 받은 정보를 토대로 AccessToken, Refresh Token을 만듬
        // Token을 토대로 URI를 만들어서 String으로 변환
        String uri = createURI(request, accessToken, refreshToken, userId).toString();
//        String uri = "http://localhost:3000";
        tokenProvider.accessTokenSetHeader(accessToken, response); // Access Token 헤더에 전송
        tokenProvider.refreshTokenSetCookie(refreshToken,response); // Refresh Token 쿠키에 전송
        int refreshTokenExpirationMinutes = tokenProvider.getRefreshTokenExpirationMinutes();
        redisDao.setValues(refreshToken,accessToken, Duration.ofMinutes(refreshTokenExpirationMinutes)); // redis 저장

        // 만든 URI로 리다이렉트 보냄
        getRedirectStrategy().sendRedirect(request,response,uri);
    }

    private URI createURI(HttpServletRequest request, String accessToken, String refreshToken, Long userId){
        // 리다이렉트시 JWT를 URI로 보내는 방법
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", "Bearer " + accessToken);
        queryParams.add("refresh_token", refreshToken);
        queryParams.add("id", String.valueOf(userId) );
//        log.info("RequestURI1 = {}", request.getQueryString()); // code

        // queryParams.add("code", code)

        String serverName = request.getServerName();
        log.info("# serverName = {}",serverName);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("sayo.s3-website.ap-northeast-2.amazonaws.com")
                //.host("localhost")
                .port(3000) // 기본 포트가 80이기 때문에 괜찮다
                .path("/login")
                .queryParams(queryParams)
                .build()
                .toUri();
    }


    /*return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host(serverName)
                //.host("localhost")
                .port(8080) // 기본 포트가 80이기 때문에 괜찮다
                .path("/receive-token.html")
                .queryParams(queryParams)
                .build()
                .toUri();
    }*/
}

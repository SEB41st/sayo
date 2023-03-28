package project2.SAYO.domain.user.controller;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class Oauth2Controller {
    @GetMapping("/login/oauth2/code/kakao")
    public @ResponseBody String kakakoCallback(String code){

        return "카카오 인증 완료 코드값 : " + code;
    }


}

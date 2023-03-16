package project2.SAYO.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import project2.SAYO.global.loginresolver.LoginUserEmailResolver;
import project2.SAYO.global.loginresolver.LoginUserIdResolver;

import java.util.List;

// CORS 에러 방지를 위함
@Configuration
public class WebConfig implements WebMvcConfigurer {

/*    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("*") //
                        .allowedHeaders("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS" , "PATCH")
                        .exposedHeaders("Authorization","RefreshToken"); //, "RefreshToken", "AccessToken"
                //.allowCredentials(true); 와일드카드로 했을때 에러가 난다 실행조차 안됨
            }
        };
    }*/
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new LoginUserIdResolver());
        resolvers.add(new LoginUserEmailResolver());
    }
}

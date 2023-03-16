package project2.SAYO.global.oauth;

import lombok.AllArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@ToString
@AllArgsConstructor
public class OAuthCustomUser implements OAuth2User, Serializable {

    private List<GrantedAuthority> authorities;
    private Map<String, Object> attributes;
    private String registrationId;

    public static OAuthCustomUser of(List<GrantedAuthority> authorities,
                                     Map<String, Object> attributes,
                                     String registrationId) {

        return new OAuthCustomUser(authorities,attributes,registrationId);
    }

    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    @Override
    // GrantedAuthority는 ID, PW 기반 인증에서 UserDetailsService를 통해 조회
    // 해당 메서드를 통해 인증받은 사용자의 authorities 조회 가능
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return registrationId;
    }
}

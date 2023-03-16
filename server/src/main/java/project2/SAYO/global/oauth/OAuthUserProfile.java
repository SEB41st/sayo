package project2.SAYO.global.oauth;

import lombok.Getter;
import project2.SAYO.domain.user.entity.Profile;
import project2.SAYO.domain.user.entity.User;

import java.util.List;

import static project2.SAYO.domain.user.entity.User.*;

@Getter
public class OAuthUserProfile {
    private final String name;
    private final String email;
    private final String image;
    private final String oauthId;

    public OAuthUserProfile(String name, String email, String image, String oauthId) {
        this.name = name;
        this.email = email;
        this.image = image;
        this.oauthId = oauthId;
    }

    public User createOauth2User(String name, String email, String image, List<String> roles, OAuthStatus oAuthStatus) {
        Profile profile = new Profile();
        profile.setNickname(name);
        profile.setImage(image);
        return new User(null, email,oauthId, profile, roles, oAuthStatus);
    }
}

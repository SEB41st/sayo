package project2.SAYO.domain.user.entity;

import lombok.*;
import project2.SAYO.global.audit.Auditable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // auto-increment
    @Column(length = 50, unique = true, updatable = false, nullable = false)
    private String email;  // 회원 메일
    @Column(length = 100, nullable = false)
    private String password; // 비밀번호

    @Embedded
    @Setter
    private Profile profile;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20)
    private UserStatus userStatus = UserStatus.USER_ACTIVE; // 회원 상태

//    @Enumerated(value = EnumType.STRING)
//    @Column(length = 20)
//    private ProviderType providerType; // GOOGLE/NAVER/KAKAO
//
    @Setter
    @Enumerated(value = EnumType.STRING)
    private OAuthStatus oAuthStatus;

    public enum OAuthStatus {
        NORMAL("일반"),
        OAUTH("소셜");

        @Getter
        private String status;

        OAuthStatus(String status) {
            this.status = status;
        }
    }

    public enum UserStatus {
        USER_ACTIVE("활동중"),
        USER_SLEEP("휴면"),
        USER_QUIT("탈퇴");
        @Getter
        private String status;
        UserStatus(String status) {
            this.status = status;
        }
    }


//    public enum ProviderType {
//        GOOGLE("구글"),
//        NAVER("네이버"),
//        KAKAO("카카오");
//
//        @Getter
//        private String providerType;
//        ProviderType(String providerType) {
//            this.providerType = providerType;
//        }
//    }

//    public void setRoles(List<String> roles){
//        this.roles = roles;
//    }

//    public void setUserId(Long userId){
//        this.userId = userId;
//    }
//
//    public void setEmail(String email){
//        this.email = email;
//    }

//    public void setPassword(String password){
//        this.password = password;
//    }

    public void changeUserStatus(UserStatus userStatus){
        this.userStatus = userStatus;
    }


    @Builder
    public User(Long id, String email, String password, Profile profile, String roles, UserStatus userStatus){
        this.id = id;
        this.email = email;
        this.password = password;
        this.profile = profile;
        this.roles.add(roles);
        this.userStatus = userStatus;
    }

    public User(Long id, String email, String password, Profile profile, List<String> roles, OAuthStatus oAuthStatus){
        this.id = id;
        this.email = email;
        this.password = password;
        this.profile = profile;
        this.roles = roles;
        this.oAuthStatus = oAuthStatus;
    }

    public void setPassword(String encryptedPassword){
        this.password = encryptedPassword;
    }

    public void setRoles(List<String> roles){
        this.roles = roles;
    }

    public User oauthUpdate(String name, String email, String image, List<String> roles, OAuthStatus oAuthStatus) {
        this.email = email;
        this.profile.setNickname(name);
        this.profile.setImage(image);
        this.roles = roles;
        this.oAuthStatus = oAuthStatus;
        return this;
    }

}

package project2.SAYO.domain.user.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project2.SAYO.global.audit.Auditable;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId; // auto-increment
    @Column(length = 50, nullable = false)
    private String userName;  // 회원 이름
    @Column(length = 50, unique = true, nullable = false)
    private String nickName;  // 회원 닉네임
    @Column(length = 50, unique = true, updatable = false, nullable = false)
    private String email;  // 회원 메일
    @Column(length = 50, nullable = false)
    private String password; // 비밀번호
    private String userPicture; // 회원 사진

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private UserStatus userStatus = UserStatus.USER_ACTIVE; // 회원 상태

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20)
    private ProviderType providerType; // GOOGLE/NAVER/KAKAO

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
    public enum ProviderType {
        GOOGLE("구글"),
        NAVER("네이버"),
        KAKAO("카카오");

        @Getter
        private String providerType;
        ProviderType(String providerType) {
            this.providerType = providerType;
        }
    }
}

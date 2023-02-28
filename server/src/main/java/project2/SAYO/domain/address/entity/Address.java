package project2.SAYO.domain.address.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.global.audit.Auditable;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Address extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;  // auto-increment
    @Column(length = 100, nullable = false)
    private String addressName;  // 주소명칭 (ex. 집)
    @Column(length = 50, nullable = false)
    private String addressUserName; // 회원 이름
    @Column(length = 15, unique = true, nullable = false)
    private String phoneNumber; // 휴대폰
    @Column(length = 200, nullable = false)
    private String detailAddress; // 상세 주소

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    @Setter
    private User user;
}

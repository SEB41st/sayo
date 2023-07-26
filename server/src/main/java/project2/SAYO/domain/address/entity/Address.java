package project2.SAYO.domain.address.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.global.audit.Auditable;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;  //  auto-increment
    @Column(length = 100, nullable = false)
    private String addressName;  // 주소명칭 (ex. 집)
    @Column(length = 50, nullable = false)
    private String addressUserName; // 회원 이름
    @Column(length = 15, unique = true, nullable = false)
    private String phoneNumber; // 휴대폰
    @Column(length = 5, nullable = false)
    private Long postcode; // 우편번호
    @Column(length = 50, nullable = false)
    private String roadAddress; // 도로명 주소
    @Column(length = 200, nullable = false)
    private String detailAddress; // 상세 주소

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "USER_ID")
    @Setter
    private User user;

    public void addUser(User user) {
        this.user = user;
    }
    public void addAddressId(Long addressId) {
        this.addressId = addressId;
    }

}

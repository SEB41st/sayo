package project2.SAYO.domain.order.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project2.SAYO.global.audit.Auditable;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Order extends Auditable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long addressId;

    @Column(nullable = false)
    private Long orderPrice;

    @Column(nullable = false)
    private Enum orderStatus;

//    @ManyToOne
//    @JoinColumn(name="USER_ID")
//    private User user; 유저 클래스 병합 후 연결
}

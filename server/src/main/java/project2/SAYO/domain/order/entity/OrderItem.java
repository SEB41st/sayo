package project2.SAYO.domain.order.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    @Column
    private Long waybillNumber;

    @ManyToOne
    @JoinColumn(name="ORDER_ID")
    private Order order;

//    @ManyToOne
//    @JoinColumn(name="USER_ID")
//    private User user; 유저 클래스 병합 후 연결

//    @ManyToOne
//    @JoinColumn(name="ORDER_ID")
//    private Order order; 오더 클래스 병합 후 연결
}

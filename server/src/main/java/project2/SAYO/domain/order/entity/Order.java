package project2.SAYO.domain.order.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.global.audit.Auditable;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order extends Auditable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(nullable = false)
    private Long orderPrice;

    @Column
    private OrderStatus orderStatus;

    @ManyToOne
    @JoinColumn(name="USER_ID")
    private User user;



    public enum OrderStatus {
        PAYMENT_COMPLETED("결제 완료"),
        PRODUCT_PREPARED("상품 준비 중"),
        DELIVERY_PROGRESS("배송 중"),
        DELIVERY_COMPLETED("배송 완료"),
        PURCHASE_CONFIRMATION("구매 확정");

        @Getter
        private String status;
        OrderStatus(String status) {
            this.status = status;
        }

    }
    public void addUser(User user) {this.user = user;}
    public void CurOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }
    public void addOrderId(long orderId) { this.orderId = orderId;}
}

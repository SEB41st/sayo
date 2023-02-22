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

    @Column(nullable = false)
    private Long orderId;

    @Column(nullable = false)
    private Long itemId;

    @Column(nullable = false)
    private Long waybillNumber;

    @ManyToOne
    @JoinColumn(name="ORDER_ID")
    private Order order;

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
}

package project2.SAYO.domain.order.entity;

import lombok.*;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCartItem;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.global.audit.Auditable;


import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orderItems")
public class OrderItem extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;
    @Column
    private Long itemId; // 주문상품 Id
    @Column
    private String itemPicture; // 주문상품 이미지
    @Column
    private String itemName; // 주문상품 명
    @Column
    private int itemCount; // 주문상품 수량
    @Column
    private int itemPrice; // 주문상품 가격
    @Column
    private int TotalCount;
    @Column
    private int itemTotalPrice; // 주문상품 총 가격

    @Column
    private OrderItem.OrderStatus orderStatus;

    public enum OrderStatus {
        PAYMENT_COMPLETED("결제 완료"),
        PRODUCT_PREPARED("상품 준비 중"),
        DELIVERY_PROGRESS("배송 중"),
        DELIVERY_COMPLETED("배송 완료"),
        PURCHASE_CONFIRMATION("구매 확정"),
        ORDER_CANCELLATION("주문 취소");

        @Getter
        private String status;
        OrderStatus(String status) {
            this.status = status;
        }
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="shoppingCart_id")
    private ShoppingCartItem shoppingCartItem;


}

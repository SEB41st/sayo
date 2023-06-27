package project2.SAYO.domain.order.dto;

import lombok.*;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCartItem;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDto {
    private List<Item> itemList;
    private Long id;
    private String orderCode;
    private Long amount;
    private Long paymentId;
    private String orderName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

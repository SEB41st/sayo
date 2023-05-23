package project2.SAYO.domain.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project2.SAYO.domain.order.entity.OrderItem;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class OrderItemDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class Request {
        //@NotBlank(message = "가격은 작성하셔야 합니다.")
        private int itemTotalPrice;
        private OrderItem.OrderStatus orderStatus;
        /*@Nullable
        private Long waybillNumber;*/

    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Builder
    public static class Response {
        private Long orderItemId;
        private OrderItem.OrderStatus orderStatus;
        /*@Nullable
        private Long waybillNumber;*/
        private Long userId;
        private Long itemId;
        private String itemPicture;
        private String itemName;
        private int itemCount;
        private int totalCount;
        private int itemTotalPrice;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}

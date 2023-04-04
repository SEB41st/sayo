package project2.SAYO.domain.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project2.SAYO.domain.order.entity.Order;
import reactor.util.annotation.Nullable;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class OrderDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class Request {
        @NotBlank(message = "가격은 작성하셔야 합니다.")
        private Long orderPrice;
        private Order.OrderStatus orderStatus;
        @Nullable
        private Long waybillNumber;

    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Builder
    public static class Response {
        private Long orderId;
        private Long orderPrice;
        private Order.OrderStatus orderStatus;
        @Nullable
        private Long waybillNumber;
        private Long userId;
        private Long itemId;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}

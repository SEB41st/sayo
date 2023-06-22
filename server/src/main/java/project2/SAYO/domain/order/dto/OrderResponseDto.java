package project2.SAYO.domain.order.dto;

import java.time.LocalDateTime;

public class OrderResponseDto {
    private Long orderId;
    private String orderCode;
    private Long amount;
    private Long paymentId;
    private String OrderName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

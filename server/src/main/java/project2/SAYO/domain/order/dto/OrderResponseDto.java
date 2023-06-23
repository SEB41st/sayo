package project2.SAYO.domain.order.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDto {
    private Long id;
    private String orderCode;
    private Long amount;
    private Long paymentId;
    private String orderName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

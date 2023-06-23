package project2.SAYO.domain.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDto {
    private Long id;
    private String orderCode;
    private Long amount;
    private Long paymentId;
    private String OrderName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

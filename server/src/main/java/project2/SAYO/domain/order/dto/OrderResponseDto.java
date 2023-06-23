package project2.SAYO.domain.order.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
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
    private String OrderName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

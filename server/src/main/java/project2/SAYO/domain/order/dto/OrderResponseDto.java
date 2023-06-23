package project2.SAYO.domain.order.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.*;

import java.util.Date;

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
    private Date createdAt;
    private Date modifiedAt;
}

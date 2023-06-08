package project2.SAYO.domain.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResHandleFailDto{
    private String errorCode;
    private String errorMsg;
    private String orderId;
}

package project2.SAYO.domain.payment.dto;

import lombok.*;
import project2.SAYO.domain.payment.enums.PayType;
import project2.SAYO.domain.payment.enums.PaymentStatus;
import project2.SAYO.domain.user.entity.User;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRes{
    private Long paymentId;

    private PayType payType;
    private PaymentStatus paymentStatus;
    private Long amount;
    private String orderId;
    private String orderName;
    private String userName;
    private String failDescription;
    private boolean cancel;
    private LocalDateTime createdAt;
    private User user;


}

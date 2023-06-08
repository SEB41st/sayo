package project2.SAYO.domain.payment.dto;

import lombok.*;
import project2.SAYO.domain.payment.entity.Payment;
import project2.SAYO.domain.payment.enums.PayType;
import project2.SAYO.domain.payment.enums.PaymentStatus;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentReq{
    private PayType payType;
    private Long amount; // 구매 금액
    private String orderName; // 주문 상품 이름
    public Payment toEntity(){
        return Payment.builder()
                .payType(payType)
                .orderId(UUID.randomUUID().toString())
                .amount(amount)
                .orderName(orderName)
                .paymentStatus(PaymentStatus.READY)
                .build();
    }
}

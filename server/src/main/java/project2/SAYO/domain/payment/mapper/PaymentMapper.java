package project2.SAYO.domain.payment.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import project2.SAYO.domain.payment.dto.PaymentFailDto;
import project2.SAYO.domain.payment.dto.PaymentReq;
import project2.SAYO.domain.payment.dto.PaymentRes;
import project2.SAYO.domain.payment.entity.Payment;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PaymentMapper {
    default Payment paymentResToPayment(PaymentRes paymentRes){
        return Payment.builder()
                .paymentId(paymentRes.getPaymentId())
                .payType(paymentRes.getPayType())
                .paymentStatus(paymentRes.getPaymentStatus())
                .amount(paymentRes.getAmount())
                .orderId(paymentRes.getOrderId())
                .orderName(paymentRes.getOrderName())
                .userName(paymentRes.getUserName())
                .createdAt(paymentRes.getCreatedAt())
                .user(paymentRes.getUser())
                .build();
    };

    default PaymentFailDto createPaymentFailDto(String code, String errorMsg, String orderId) {
        return PaymentFailDto.builder()
                .errorCode(code)
                .errorMsg(errorMsg)
                .orderId(orderId)
                .build();
    }
}

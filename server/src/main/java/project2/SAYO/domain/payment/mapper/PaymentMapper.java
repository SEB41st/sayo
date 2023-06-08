package project2.SAYO.domain.payment.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import project2.SAYO.domain.payment.dto.PaymentDto;
import project2.SAYO.domain.payment.dto.PaymentReq;
import project2.SAYO.domain.payment.dto.PaymentRes;
import project2.SAYO.domain.payment.dto.PaymentResHandleFailDto;
import project2.SAYO.domain.payment.entity.Payment;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PaymentMapper {
    Payment paymentReqToPayment(PaymentReq paymentReq);
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
    Payment failResToPayment(PaymentDto.failRes failRes);
    PaymentRes paymentToPaymentRes(Payment payment);

    default PaymentResHandleFailDto createPaymentFailDto(String code, String errorMsg, String orderId) {
        return PaymentResHandleFailDto.builder()
                .errorCode(code)
                .errorMsg(errorMsg)
                .orderId(orderId)
                .build();
    }
}

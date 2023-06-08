package project2.SAYO.domain.payment.entity;

import lombok.*;
import project2.SAYO.domain.payment.dto.PaymentDto;
import project2.SAYO.domain.payment.dto.PaymentRes;
import project2.SAYO.domain.payment.enums.PayType;
import project2.SAYO.domain.payment.enums.PaymentStatus;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.global.audit.Auditable;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Payment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private PayType payType;

    private PaymentStatus paymentStatus;

    private Long amount;
    private String orderId;
    private String orderName;
    private String userName;
    private String paymentKey;
    private String failDescription;
    private boolean cancel;
    private LocalDateTime createdAt;
    @ManyToOne
    private User user;

    public PaymentRes toDto(){
        return PaymentRes.builder()
                .amount(amount)
                .paymentId(paymentId)
                .paymentStatus(paymentStatus)
                .payType(payType)
                .orderId(orderId)
                .orderName(orderName)
                .userName(userName)
                .createdAt(getCreatedAt())
                .user(user)
                .build();

    }
}

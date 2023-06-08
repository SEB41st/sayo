package project2.SAYO.domain.payment.dto;

import lombok.*;
import project2.SAYO.domain.payment.entity.Payment;
import project2.SAYO.domain.payment.enums.PayType;

import java.time.LocalDateTime;
import java.util.UUID;

public class PaymentDto {



    public class paymentSuccessDto {
        String mid;
        String version;
        String paymentKey;
        String orderId;
        String orderName;
        String currency;
        String method;
        String totalAmount;
        String balanceAmount;
        String suppliedAmount;
        String vat;
        String status;
        String requestedAt;
        String approvedAt;
        String useEscrow;
        String cultureExpense;
        PaymentDto.paymentSuccessCardDto card;
        String type;
    }

    public class paymentSuccessCardDto {
        String company;                 // 회사명
        String number;                  // 카드번호
        String installmentPlanMonths;   // 할부 개월
        String isInterestFree;          // 이자여부
        String approveNo;               // 승인번호
        String useCardPoint;            // 카드 포인트 사용 여부
        String cardType;                // 카드 타입
        String ownerType;               // 소유자 타입
        String acquireStatus;           // 승인 상태
        String receiptUrl;              // 영수증 URL
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public class getRes{
        private String paymentKey;
        private String orderId;
        private Long amount;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public class failRes{
        private String errorCode;
        private String orderId;
        private String errorMsg;
    }




}

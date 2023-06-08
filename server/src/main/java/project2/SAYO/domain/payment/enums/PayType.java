package project2.SAYO.domain.payment.enums;

import lombok.Getter;

public enum PayType {
        CARD("카드"),
        ACCOUNT_TRANSFER("계좌이체"),
        VIRTUAL_ACCOUNT("가상계좌"),
        TOSS_PAY("토스페이");

        @Getter
        private final String type;

        PayType(String type) {
            this.type = type;
        }
}

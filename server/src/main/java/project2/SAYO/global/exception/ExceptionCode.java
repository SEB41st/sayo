package project2.SAYO.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    ITEM_NOT_FOUND(404, "Item not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}

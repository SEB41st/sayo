package project2.SAYO.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    // User
    USER_NOT_FOUND(404, "Member not found"),
    USER_EXISTS(409, "Member exists"),

    // ORDER
     ORDER_NOT_FOUND(404, "Order not found"),

    // Item
    ITEM_NOT_FOUND(404, "Item not found"),

    // File Upload
    UPLOAD_VOLUME_OVER(404, "File Size가 10MB를 초과하였습니다 !");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}

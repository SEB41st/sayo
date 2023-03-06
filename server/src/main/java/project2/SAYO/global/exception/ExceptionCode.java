package project2.SAYO.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    // User
    USER_NOT_FOUND(404, "User not found"),
    USER_NOT_ALLOW(405, "User doesn't have authority"),
    USER_EXISTS(409, "User exists"),
    USER_UNAUTHORIZED(401, "User unauthorized"),
    TOKEN_NOT_ALLOW(404, "Token not allow"),
    REFRESH_TOKEN_NOT_FOUND(404, "Refresh token not found"),
    REFRESH_TOKEN_NOT_EQUAL(404, "Refresh token doesn't equal"),
    REFRESH_TOKEN_NOT_ALLOW(404, "Token not allow"),

    // ORDER
     ORDER_NOT_FOUND(404, "Order not found"),

    // ShoppingCart
    SHOPPINGCART_NOT_FOUND(404, "ShoppingChart not found"),

    // Wish
    WISH_NOT_FOUND(404, "Wish not found"),

    // Item
    ITEM_NOT_FOUND(404, "Item not found"),

    // Address
    ADDRESS_NOT_FOUND(404, "Address not found"),

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

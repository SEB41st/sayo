package project2.SAYO.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    // User
    USER_IS_NOT_SAME(400, "User is not the same"),
    USER_ROLE_DOES_NOT_HAVE(403, "The role doesn't have."),
    USER_NOT_FOUND(404, "User not found"),
    USER_NOT_ALLOW(405, "User doesn't have authority"),
    USER_EXISTS(409, "User exists"),
    USER_UNAUTHORIZED(401, "User unauthorized"),
    TOKEN_NOT_ALLOW(404, "Token not allow"),
    REFRESH_TOKEN_NOT_EQUAL(404, "Refresh token doesn't equal"),
    REFRESH_TOKEN_NOT_ALLOW(404, "Token not allow"),

    // JWT, 인증관련
    ACCESS_TOKEN_NOT_FOUND(404,"Access Token을 찾을 수 없습니다."),
    REFRESH_TOKEN_NOT_FOUND(404,"Refresh Token을 찾을 수 없습니다."),
    HEADER_REFRESH_TOKEN_NOT_FOUND(404,"Header 정보에 Refresh Token 정보가 없습니다."),
    TOKEN_IS_NOT_SAME(404,"Refresh Token과 발급된 Access Token 정보가 일치하지 않습니다."),
    NO_ACCESS_TOKEN(403, "권한 정보가 없는 토큰입니다."),
    TOKEN_EXPIRED(400, "Token Expired"),
    TOKEN_INVALID(400, "Token Invalid"),
    TOKEN_SIGNATURE_INVALID(400, "Token Signature Invalid"),
    TOKEN_MALFORMED(400, "Token Malformed"),
    TOKEN_UNSUPPORTED(400, "Token Unsupported"),
    TOKEN_ILLEGAL_ARGUMENT(400, "Token Illegal Argument"),
    ANONYMOUS_USER(404, "Anonymous User"),
    TOKEN_DELETE_FAIL(400, "Refresh Token 삭제를 실패하였습니다."),

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
    UPLOAD_FAILED(404, "File Upload Failed !"),
    UPLOAD_VOLUME_OVER(404, "File Size가 10MB를 초과하였습니다 !"),

    // AES128Cofig
    ENCRYPTION_FAIED(400, "Item not found"),
    DECRYPTION_FAIED(400, "Item not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}

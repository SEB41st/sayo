package project2.SAYO.domain.shoppingCart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class ShoppingCartItemDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Builder
    public static class Response {
        private long itemId;
        private String itemName;
        private long itemPrice;
        private String itemPicture;
        private int itemDeliveryPrice;
        private long userId;
        private long shoppingCartId;
        private int itemCount;
        private int itemTotalCount;
        private boolean shoppingCartSelected;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

    }

}

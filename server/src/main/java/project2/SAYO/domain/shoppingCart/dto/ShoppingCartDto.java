package project2.SAYO.domain.shoppingCart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class ShoppingCartDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Builder
    public static class Response {
        private long itemId;
        private long userId;
        private long shoppingCartId;
        private boolean shoppingCartSelected;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

    }

}

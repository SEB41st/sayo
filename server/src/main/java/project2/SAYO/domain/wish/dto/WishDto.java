package project2.SAYO.domain.wish.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class WishDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class Post{
        @NotBlank
        private long itemId;
        @NotBlank
        private boolean wishSelected;

        public void addItemId(long itemId) {
            this.itemId = itemId;
        }
    }
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class Patch {

        @NotBlank
        private boolean wishSelected;

    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Builder
    public static class Response {
        private long itemId;
        private String itemName;
        private long itemPrice;
        private String itemPicture;
        private long userId;
        private long wishId;
        private boolean wishSelected;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

    }
}

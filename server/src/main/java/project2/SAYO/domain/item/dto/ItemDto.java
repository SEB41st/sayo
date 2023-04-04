package project2.SAYO.domain.item.dto;

import lombok.*;
import project2.SAYO.domain.item.entity.Item;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class ItemDto {

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ItemPost{
        @NotBlank(message="상품 이름을 입력해주세요.")
        private String itemName; // 상품 이름
        @NotBlank(message="상품 이미지를 선택해주세요.")
        private String itemPicture; // 상품 이미지
        /*@NotNull(message="무료배송 여부를 선택해주세요.")
        private boolean itemDelivery; // 무료배송 여부*/
       // @NotNull(message="배송 가격을 입력해주세요.")
        private int itemDeliveryPrice; // 배송비 가격
       // @NotNull(message="상품 가격을 입력해주세요.")
        private int itemPrice; // 상품 가격
        @NotBlank(message="상품 설명을 입력해주세요.")
        private String itemBody; // 상품 설명
        @NotBlank(message="참여 시작 일정을 입력해주세요.")
        private String itemDateStart; // 참여 일정

        @NotBlank(message="참여 종료 일정을 입력해주세요.")
        private String itemDateEnd; // 참여 종료 일정

        private long categoryId;
        /*@NotBlank(message="상품 태그를 선택해주세요.")
        private String itemTag; // 상품 태그*/

        @NotNull(message = "공동구매 지역을 선택해주세요.")
        private Map<String,Double> location = new HashMap<>();
        private Item.ItemStatus itemStatus;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class ItemPatch{
        private String itemName; // 상품 이름
        private String itemPicture; // 상품 이미지
        /*@NotBlank(message="무료배송 여부를 선택해주세요.")
        private boolean itemDelivery; // 무료배송 여부*/
        private int itemDeliveryPrice; // 배송비 가격
        private int itemPrice; // 상품 가격
        private String itemBody; // 상품 설명
        private String itemDateStart; // 참여 일정
        private String itemDateEnd; // 참여 종료 일정
        /*@NotBlank(message="상품 태그를 선택해주세요.")
        private String itemTag; // 상품 태그*/
        private Item.ItemStatus itemStatus; // 상품 진행 상태
        private long categoryId;
        @NotNull(message = "공동구매 지역을 선택해주세요.")
        private Map<String,Double> location = new HashMap<>();
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ItemResponse{
        private Long itemId; // 아이디
        private String itemName; // 상품 이름
        private String itemPicture; // 상품 이미지
        //private boolean itemDelivery; // 무료배송 여부
        private int itemDeliveryPrice; // 배송비 가격
        private int itemPrice; // 상품 가격
        private String itemBody; // 상품 설명
        private String itemDateStart; // 참여 시작 일정
        private String itemDateEnd; // 참여 종료 일정
        private long categoryId; // 카테고리 번호
        //private String itemTag; // 상품 태그

        private double latitude; // 위도
        private double longitude; // 경도
        private Item.ItemStatus itemStatus;

        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}

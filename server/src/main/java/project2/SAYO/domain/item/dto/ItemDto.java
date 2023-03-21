package project2.SAYO.domain.item.dto;

import lombok.*;
import project2.SAYO.domain.item.entity.Item;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class ItemDto {

    @Getter
    @Builder
    @AllArgsConstructor
    public static class ItemPost{
        @NotBlank(message="상품 이름을 입력해주세요.")
        private String itemName; // 상품 이름
        @NotBlank(message="상품 이미지를 선택해주세요.")
        private String itemPicture; // 상품 이미지
        @NotBlank(message="무료배송 여부를 선택해주세요.")
        private boolean itemDelivery; // 무료배송 여부
        @NotBlank(message="배송 가격을 입력해주세요.")
        private int itemDeliveryPrice; // 배송비 가격
        @NotBlank(message="상품 가격을 입력해주세요.")
        private int itemPrice; // 상품 가격
        @NotBlank(message="상품 설명을 입력해주세요.")
        private String itemBody; // 상품 설명
        @NotBlank(message="참여 일정을 입력해주세요.")
        private String itemDate; // 참여 일정
        /*@NotBlank(message="상품 태그를 선택해주세요.")
        private String itemTag; // 상품 태그*/

        /*경도 위도의 경우 지도 API 연결을 통해 입력되기 때문에 ItemPost에서 필요할지, 어떻게 입력될지 추후 확인 필요*/
        private double itemPlace_X; // 경도
        private double itemPlace_Y; // 위도
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class ItemPatch{
        @NotBlank(message="상품 이름을 입력해주세요.")
        private String itemName; // 상품 이름
        @NotBlank(message="상품 이미지를 선택해주세요.")
        private String itemPicture; // 상품 이미지
        @NotBlank(message="무료배송 여부를 선택해주세요.")
        private boolean itemDelivery; // 무료배송 여부
        @NotBlank(message="배송 가격을 입력해주세요.")
        private int itemDeliveryPrice; // 배송비 가격
        @NotBlank(message="상품 가격을 입력해주세요.")
        private int itemPrice; // 상품 가격
        @NotBlank(message="상품 설명을 입력해주세요.")
        private String itemBody; // 상품 설명
        @NotBlank(message="참여 일정을 입력해주세요.")
        private String itemDate; // 참여 일정
        /*@NotBlank(message="상품 태그를 선택해주세요.")
        private String itemTag; // 상품 태그*/
        private Item.ItemStatus itemStatus; // 상품 진행 상태

        /*경도 위도의 경우 지도 API 연결을 통해 입력되기 때문에 ItemPost에서 필요할지, 어떻게 입력될지 추후 확인 필요*/
        private double itemPlace_X; // 경도
        private double itemPlace_Y; // 위도
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ItemResponse{
        private Long itemId; // 아이디
        private String itemName; // 상품 이름
        private String itemPicture; // 상품 이미지
        private boolean itemDelivery; // 무료배송 여부
        private int itemDeliveryPrice; // 배송비 가격
        private int itemPrice; // 상품 가격
        private String itemBody; // 상품 설명
        private String itemDate; // 참여 일정
        //private String itemTag; // 상품 태그

        /*경도 위도의 경우 지도 API 연결을 통해 입력되기 때문에 ItemPost에서 필요할지, 어떻게 입력될지 추후 확인 필요*/
        private double itemPlace_X; // 경도
        private double itemPlace_Y; // 위도

        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}

package project2.SAYO.domain.item.dto;

import lombok.*;

import java.time.LocalDateTime;

public class ItemDto {

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class ItemPost{
        private String itemName; // 상품 이름
        private String itemPicture; // 상품 이미지
        private boolean itemDelivery; // 무료배송 여부
        private int itemDeliveryPrice; // 배송비 가격
        private int itemPrice; // 상품 가격
        private String itemBody; // 상품 설명
        private String itemDate; // 참여 일정
        private String itemTag; // 상품 태그

        /*경도 위도의 경우 지도 API 연결을 통해 입력되기 때문에 ItemPost에서 필요할지, 어떻게 입력될지 추후 확인 필요*/
        private double itemPlace_X; // 경도
        private double itemPlace_Y; // 위도
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class ItemPatch{
        private String itemName; // 상품 이름
        private String itemPicture; // 상품 이미지
        private boolean itemDelivery; // 무료배송 여부
        private int itemDeliveryPrice; // 배송비 가격
        private int itemPrice; // 상품 가격
        private String itemBody; // 상품 설명
        private String itemDate; // 참여 일정
        private String itemTag; // 상품 태그

        /*경도 위도의 경우 지도 API 연결을 통해 입력되기 때문에 ItemPost에서 필요할지, 어떻게 입력될지 추후 확인 필요*/
        private double itemPlace_X; // 경도
        private double itemPlace_Y; // 위도
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ItemResponse{
        private String itemName; // 상품 이름
        private String itemPicture; // 상품 이미지
        private boolean itemDelivery; // 무료배송 여부
        private int itemDeliveryPrice; // 배송비 가격
        private int itemPrice; // 상품 가격
        private String itemBody; // 상품 설명
        private String itemDate; // 참여 일정
        private String itemTag; // 상품 태그

        /*경도 위도의 경우 지도 API 연결을 통해 입력되기 때문에 ItemPost에서 필요할지, 어떻게 입력될지 추후 확인 필요*/
        private double itemPlace_X; // 경도
        private double itemPlace_Y; // 위도

        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}

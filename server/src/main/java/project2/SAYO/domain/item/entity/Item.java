package project2.SAYO.domain.item.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.global.audit.Auditable;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Item extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    @Column(nullable = false, length = 50, unique = true)
    private String itemName; // 상품 이름

    @Column(nullable = false)
    private String itemPicture; // 상품 이미지

    @Column(nullable = false)
    private boolean itemDelivery; // 무료배송 여부

    @Column(nullable = false)
    private int itemDeliveryPrice; // 배송비 가격

    @Column(nullable = false)
    private int itemPrice; // 상품 가격

    @Column(nullable = false, length = 2000)
    private String itemBody; // 상품 설명

    @Column(nullable = false)
    private String itemDate; // 참여 일정

    @Column(length = 50)
    private String itemTag; // 상품 태그 (카테고리랑 연관관계 매핑)

    @Column(nullable = false)
    private double itemPlace_X; // 경도

    @Column(nullable = false)
    private double itemPlace_Y; // 위도

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private ItemStatus itemStatus = ItemStatus.ITEM_PROGRESS; // 공동구매 진행 상황

    public void addItemId(Long itemId) {
        this.itemId = itemId;
    }

    public void changeItemStatus(ItemStatus itemStatus){
        this.itemStatus = itemStatus;
    }

    public enum ItemStatus{
        ITEM_PROGRESS("공동구매 진행중"),
        ITEM_END("공동 구매 종료");

        @Getter
        private String status;

        ItemStatus(String status){
            this.status = status;
        }
    }

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    public void addUser(User user){
        this.user = user;
    }
}

package project2.SAYO.domain.shoppingCart.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.order.entity.Order;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.global.audit.Auditable;

import javax.persistence.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingCartItem extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shoppingCartId;

    @Column
    private Boolean shoppingCartSelected;

    @ManyToOne
    @JoinColumn(name="USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    private Item item;

    private String itemName;
    private int itemPrice;
    private String itemPicture;
    private int itemCount; // 담긴 상품의 수량
    private int itemTotalCount; // 장바구니에 담긴 상품의 총 수량
    private Boolean orderCheck; // 장바구니의 주문을 위한 체크 현황

    @ManyToOne
    @JoinColumn(name="ORDER_ID")
    private Order order;

    public void addUser(User user) {
        this.user = user;
    }

    public void addItem(Item item) {
        this.item = item;
    }
    public void addItemCount(int itemCount){
        this.itemCount = itemCount;
    }
    public void addItemTotalCount(int itemTotalCount){
        this.itemTotalCount = itemTotalCount;
    }

    public void changeShoppingCartSelected(boolean shoppingCartSelected) {
        this.shoppingCartSelected = shoppingCartSelected;
    }
    public void changeOrderCheck(boolean orderCheck){
        this.orderCheck = orderCheck;
    }

    public static ShoppingCartItem createShoppingCartItem(User user, Item item){
        ShoppingCartItem cartItem = new ShoppingCartItem();
        cartItem.addUser(user);
        cartItem.addItem(item);
        cartItem.itemCount = 0;
        cartItem.itemTotalCount = 0;
        return cartItem;
    }

    public void addCount(int count){
        this.itemCount += itemCount;
    }

    public void addTotalCount(int itemTotalCount){
        this.itemTotalCount += itemTotalCount;
    }

    /*
    * item - ShoppingCartItem - User로 하여 ShoppingCart와 ShoppingCartItem 테이블을 합쳐서 하나의 테이블로 사용
    * ShoppingCartItem에는 userId, itemId, itemCount를 가지며, 해당 userId를 가진 ShoppingCartItem들의 리스트를 출력하면 장바구니 완성 가능
    *
    * */

}
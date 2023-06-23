package project2.SAYO.domain.order.entity;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCartItem;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.global.audit.Auditable;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Order extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private LocalDateTime createDate; // 날짜

    // payment에서 저장해야 하는 것
    private String OrderName;
    private Long amount;
    private String orderCode;
    private Long paymentId;

    // shoppingCart에서 저장해야 하는 것
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<ShoppingCartItem> shoppingCartItemList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "ORDER_ID")
    private User user;

    public void addShoppingCartItem(ShoppingCartItem shoppingCartItem){
        shoppingCartItemList.add(shoppingCartItem);
        shoppingCartItem.setOrder(this);
    }

    public static Order createOrder(User user, List<ShoppingCartItem> shoppingCartItems){
        Order order = new Order();
        order.setUser(user);
        for(ShoppingCartItem shoppingCartItem : shoppingCartItems){
            order.addShoppingCartItem(shoppingCartItem);
        }
        order.setCreateDate(LocalDateTime.now());
        return order;
    }

}

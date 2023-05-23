package project2.SAYO.domain.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project2.SAYO.domain.order.entity.OrderItem;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCartItem;
import project2.SAYO.domain.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {

    //Optional<OrderItem> findByUserAndShoppingCartItems(User user, List<ShoppingCartItem> shoppingCartItem);

}

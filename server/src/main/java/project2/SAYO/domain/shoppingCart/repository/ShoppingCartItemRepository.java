package project2.SAYO.domain.shoppingCart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCartItem;
import project2.SAYO.domain.user.entity.User;

import java.util.Optional;

public interface ShoppingCartItemRepository extends JpaRepository<ShoppingCartItem, Long> {
    Optional<ShoppingCartItem> findByUserAndItem(User user, Item item);
    Optional<ShoppingCartItem> findByUser(User user);
}

package project2.SAYO.domain.shoppingCart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCart;
import project2.SAYO.domain.user.entity.User;

import java.util.Optional;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    Optional<ShoppingCart> findByUserAndItem(User user, Item item);
}

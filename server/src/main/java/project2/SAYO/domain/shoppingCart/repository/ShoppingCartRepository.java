package project2.SAYO.domain.shoppingCart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCart;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
}

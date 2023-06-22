package project2.SAYO.domain.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project2.SAYO.domain.order.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByUserId(Long userId);
}

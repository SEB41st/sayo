package project2.SAYO.domain.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project2.SAYO.domain.item.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Item findItemById(long itemId);
}

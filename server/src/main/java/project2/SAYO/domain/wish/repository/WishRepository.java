package project2.SAYO.domain.wish.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.wish.entity.Wish;

import java.util.Optional;

public interface WishRepository extends JpaRepository<Wish, Long> {
    Optional<Wish> findByUserAndItem(User user, Item item);

}

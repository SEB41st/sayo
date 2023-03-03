package project2.SAYO.domain.wish.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project2.SAYO.domain.wish.entity.Wish;

public interface WishRepository extends JpaRepository<Wish, Long> {
}

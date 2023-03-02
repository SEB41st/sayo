package project2.SAYO.domain.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project2.SAYO.domain.category.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}

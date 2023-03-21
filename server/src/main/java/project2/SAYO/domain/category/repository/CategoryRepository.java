package project2.SAYO.domain.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import project2.SAYO.domain.category.entity.Category;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c where c.parent is null ")
    List<Category> findAllWhereParentIsNull();

}

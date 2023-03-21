package project2.SAYO.domain.category.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project2.SAYO.domain.category.dto.CategoryDto;
import project2.SAYO.domain.category.entity.Category;
import project2.SAYO.domain.category.repository.CategoryRepository;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Category createCategory(CategoryDto.CategoryRequest categoryRequest) {
        Category parent = Optional.ofNullable(categoryRequest.getParentId())
                .map(id -> categoryRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND)))
                .orElse(null);


        return categoryRepository.save(new Category(categoryRequest.getCategoryName(), parent));
    }

    public void deleteCategory(Long categoryId){
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND));
        categoryRepository.delete(category);
    }

    public List<Category> getAllCategory(){
        //categoryRepository.
        return categoryRepository.findAllWhereParentIsNull();
    }


}

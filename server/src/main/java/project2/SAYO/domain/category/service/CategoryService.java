package project2.SAYO.domain.category.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project2.SAYO.domain.category.dto.CategoryDto;
import project2.SAYO.domain.category.entity.Category;
import project2.SAYO.domain.category.repository.CategoryRepository;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Category findCategory(Long categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        Category findCategory = optionalCategory.orElseThrow(()->new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND));
        return findCategory;
    }

    public List<Category> getAllCategory(){
        List<Category> categoryList = categoryRepository.findAllWhereParentIsNull();

        // 카테고리와 연관관계매핑되어있는 아이템에서 유저정보가 패스워드까지 나와 유저 null
        categoryList.stream()
                .map(category ->  {
                    return category.getItemList().stream()
                            .map(item -> {
                                item.addUser(null);
                                return item;
                            }).collect(Collectors.toList());
                }).collect(Collectors.toList());
       return categoryList;
    }


}

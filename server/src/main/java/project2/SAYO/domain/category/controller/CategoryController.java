package project2.SAYO.domain.category.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project2.SAYO.domain.category.dto.CategoryDto;
import project2.SAYO.domain.category.entity.Category;
import project2.SAYO.domain.category.mapper.CategoryMapper;
import project2.SAYO.domain.category.service.CategoryService;
import project2.SAYO.global.Response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper mapper;

    @PostMapping
    public ResponseEntity createCategory(@Valid @RequestBody CategoryDto.CategoryRequest categoryRequest) {
        Category createCategory = categoryService.createCategory(categoryRequest);

        return new ResponseEntity(new SingleResponseDto<>(mapper.categoryToCategoryResponseDto(createCategory)), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity getCategories() {
        List<Category> categoryList = categoryService.getAllCategory();

        return new ResponseEntity<>(new SingleResponseDto<>(categoryList),HttpStatus.OK);
    }

    @DeleteMapping("/{category-id}")
    public ResponseEntity deleteCategory(@Valid @Positive @PathVariable("category-id") Long categoryId) {

        categoryService.deleteCategory(categoryId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}

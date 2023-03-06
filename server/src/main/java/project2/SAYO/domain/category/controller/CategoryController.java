package project2.SAYO.domain.category.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project2.SAYO.domain.category.dto.CategoryDto;
import project2.SAYO.domain.category.entity.Category;
import project2.SAYO.domain.category.mapper.CategoryMapper;
import project2.SAYO.domain.category.service.CategoryService;
import project2.SAYO.global.Response.MultiResponseDto;
import project2.SAYO.global.Response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/categorys")
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper mapper;

    // Category 생성
    @PostMapping
    public ResponseEntity postCategory(@Valid @RequestBody CategoryDto.CategoryRequest postRequest){

        Category category = mapper.categoryDtoToCategory(postRequest);
        Category categoryResponse = categoryService.createCategory(category);
        CategoryDto.CategoryResponse response = mapper.categoryToCategoryResponseDto(categoryResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    // Category 수정
    @PatchMapping("/{category-id}")
    public ResponseEntity patchCategory(@Valid @PathVariable("category-id") @Positive Long categoryId,
                                        @RequestBody CategoryDto.CategoryRequest patchRequest){
        Category categoryForService = mapper.categoryDtoToCategory(patchRequest);
        categoryForService.addCategoryId(categoryId);
        Category categoryResponse = categoryService.updateCategory(categoryForService);
        CategoryDto.CategoryResponse response = mapper.categoryToCategoryResponseDto(categoryResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // Category 조회
    @GetMapping("/{category-id}")
    public ResponseEntity getCategory(@Valid @PathVariable("category-id") @Positive Long categoryId){
        Category findCategory = categoryService.findVerifiedCategory(categoryId);

        return new ResponseEntity(new SingleResponseDto<>(findCategory), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity getCategories(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size){
        Page<Category> categoryPage = categoryService.findCategories(page-1, size);
        List<Category> categoryList = categoryPage.getContent();
        List<CategoryDto.CategoryResponse> response = mapper.categoryListToCategoryResponseList(categoryList);

        return new ResponseEntity(new MultiResponseDto<>(response, categoryPage), HttpStatus.OK);
    }
    @DeleteMapping("/{category-id}")
    public void deleteCategory(@Valid @PathVariable("category-id") @Positive Long categoryId){
        categoryService.deleteCategory(categoryId);
    }
}

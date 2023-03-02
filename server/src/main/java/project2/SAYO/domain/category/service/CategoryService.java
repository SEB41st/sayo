package project2.SAYO.domain.category.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import project2.SAYO.domain.category.entity.Category;
import project2.SAYO.domain.category.repository.CategoryRepository;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;
import project2.SAYO.global.util.CustomBeanUtils;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CustomBeanUtils<Category> beanUtils;

    /* Category 생성, 수정, 삭제의 권한을 관리자만 할 것인가?
    >> 관리자만 할 것이라면 인증 인가 부분을 넣지 않고 권한 설정만 하면 될 것 같아서 일단 보류 진행*/

    // category 생성
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    // category 수정
    public Category updateCategory(Category category) {
        Category findCategory = findVerifiedCategory(category.getCategoryId()); // category 존재 여부 확인

        Category updateCategory = beanUtils.copyNonNullProperties(category, findCategory);

        return categoryRepository.save(updateCategory);
    }

    // categoryId 1개 조회는 findVerifiedCategory로 처리

    // 전체 category 조회
    public Page<Category> findCategories(int page, int size) {
        return categoryRepository.findAll(PageRequest.of(page, size, Sort.by("categoryId").ascending()));
    }

    // category 삭제
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    // 충돌 방지를 위해 추후 ExceptionCode에 추가 후 주석 해지 필요
    public Category findVerifiedCategory(Long categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        Category findCategory = category.orElseThrow(/*() -> new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND)*/);
        return findCategory;
    }
}

package project2.SAYO.domain.category.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project2.SAYO.domain.category.entity.Category;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CategoryDto {
    @Getter
    @Builder
    @AllArgsConstructor
    public static class CategoryRequest {
        @NotBlank(message="카테고리 이름을 입력해주세요.")
        @Size(min = 2, max = 15, message = "길이 제한은 2~15자 이내입니다.")
        private String categoryName; // 카테고리 명
        private Long parentId;
    }


    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CategoryResponse {
        private Long categoryId;
        private String categoryName; // 카테고리 명
        private List<Category> children;
        //private List<Item> itemList;
    }

}

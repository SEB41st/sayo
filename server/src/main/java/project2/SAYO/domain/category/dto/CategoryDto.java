package project2.SAYO.domain.category.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CategoryDto {
    @Getter
    @Builder
    @AllArgsConstructor
    public static class CategoryRequest {
        @NotBlank(message="카테고리 이름을 입력해주세요.")
        private String categoryName; // 카테고리 명
    }


    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CategoryResponse {
        private Long categoryId;
        private String categoryName; // 카테고리 명
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

}
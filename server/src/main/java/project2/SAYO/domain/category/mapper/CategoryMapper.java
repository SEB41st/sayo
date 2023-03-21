package project2.SAYO.domain.category.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import project2.SAYO.domain.category.dto.CategoryDto;
import project2.SAYO.domain.category.entity.Category;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {
    Category categoryDtoToCategory(CategoryDto.CategoryRequest request);
    CategoryDto.CategoryResponse categoryToCategoryResponseDto(Category category);
    List<CategoryDto.CategoryResponse> categoryListToCategoryResponseList(List<Category> category);
}

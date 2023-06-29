package project2.SAYO.domain.category.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import project2.SAYO.domain.category.dto.CategoryDto;
import project2.SAYO.domain.category.entity.Category;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-27T11:03:23+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public Category categoryRequestToCategory(CategoryDto.CategoryRequest request) {
        if ( request == null ) {
            return null;
        }

        String categoryName = null;

        categoryName = request.getCategoryName();

        Category parent = null;

        Category category = new Category( categoryName, parent );

        return category;
    }

    @Override
    public CategoryDto.CategoryResponse categoryToCategoryResponseDto(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryDto.CategoryResponse.CategoryResponseBuilder categoryResponse = CategoryDto.CategoryResponse.builder();

        categoryResponse.categoryId( category.getCategoryId() );
        categoryResponse.categoryName( category.getCategoryName() );
        List<Category> list = category.getChildren();
        if ( list != null ) {
            categoryResponse.children( new ArrayList<Category>( list ) );
        }

        return categoryResponse.build();
    }

    @Override
    public List<CategoryDto.CategoryResponse> categoryToCategoryResponseDto(List<Category> category) {
        if ( category == null ) {
            return null;
        }

        List<CategoryDto.CategoryResponse> list = new ArrayList<CategoryDto.CategoryResponse>( category.size() );
        for ( Category category1 : category ) {
            list.add( categoryToCategoryResponseDto( category1 ) );
        }

        return list;
    }
}

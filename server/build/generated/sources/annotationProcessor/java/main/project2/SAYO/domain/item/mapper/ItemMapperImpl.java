package project2.SAYO.domain.item.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import project2.SAYO.domain.item.dto.ItemDto;
import project2.SAYO.domain.item.entity.Item;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-22T11:24:30+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class ItemMapperImpl implements ItemMapper {

    @Override
    public List<ItemDto.ItemResponse> itemListToItemResponseList(List<Item> item) {
        if ( item == null ) {
            return null;
        }

        List<ItemDto.ItemResponse> list = new ArrayList<ItemDto.ItemResponse>( item.size() );
        for ( Item item1 : item ) {
            list.add( itemToItemResponseDto( item1 ) );
        }

        return list;
    }
}

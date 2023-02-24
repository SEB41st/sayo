package project2.SAYO.domain.item.mapper;

import project2.SAYO.domain.item.dto.ItemDto;
import project2.SAYO.domain.item.entity.Item;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ItemMapper{
    Item itemPostDtoToItem(ItemDto.ItemPost postRequest);
    Item itemPatchDtoToItem(ItemDto.ItemPatch patchRequest);
    ItemDto.ItemResponse itemToItemResponseDto(Item item);
    List<ItemDto.ItemResponse> itemListToItemResponseList(List<Item> item);
}

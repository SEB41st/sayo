package project2.SAYO.domain.item.mapper;

import project2.SAYO.domain.item.dto.ItemDto;
import project2.SAYO.domain.item.entity.Item;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ItemMapper{
    default Item itemPostDtoToItem(ItemDto.ItemPost postRequest){

        return Item.builder()
                .itemName(postRequest.getItemName())
                .itemPicture(postRequest.getItemPicture())
                .itemDelivery(postRequest.isItemDelivery())
                .itemDeliveryPrice(postRequest.getItemDeliveryPrice())
                .itemPrice(postRequest.getItemPrice())
                .itemBody(postRequest.getItemBody())
                .itemDate(postRequest.getItemDate())
                .itemPlace_X(postRequest.getItemPlace_X())
                .itemPlace_Y(postRequest.getItemPlace_Y())
                .itemStatus(postRequest.getItemStatus())
                .build();
    }

    default Item itemPatchDtoToItem(ItemDto.ItemPatch patchRequest){

        return Item.builder()
                .itemName(patchRequest.getItemName())
                .itemPicture(patchRequest.getItemPicture())
                .itemDelivery(patchRequest.isItemDelivery())
                .itemDeliveryPrice(patchRequest.getItemDeliveryPrice())
                .itemPrice(patchRequest.getItemPrice())
                .itemBody(patchRequest.getItemBody())
                .itemDate(patchRequest.getItemDate())
                .itemPlace_X(patchRequest.getItemPlace_X())
                .itemPlace_Y(patchRequest.getItemPlace_Y())
                .itemStatus(Item.ItemStatus.ITEM_PROGRESS)
                .build();
    }
    default ItemDto.ItemResponse itemToItemResponseDto(Item item){

        return ItemDto.ItemResponse.builder()
                .itemId(item.getItemId())
                .itemName(item.getItemName())
                .itemPicture(item.getItemPicture())
                .itemDelivery(item.isItemDelivery())
                .itemDeliveryPrice(item.getItemDeliveryPrice())
                .itemPrice(item.getItemPrice())
                .itemBody(item.getItemBody())
                .itemDate(item.getItemDate())
                .itemPlace_X(item.getItemPlace_X())
                .itemPlace_Y(item.getItemPlace_Y())
                .createdAt(item.getCreatedAt())
                .modifiedAt(item.getModifiedAt())
                .itemStatus(item.getItemStatus())
                .categoryId(item.getCategory().getCategoryId())
                .build();
    }
    List<ItemDto.ItemResponse> itemListToItemResponseList(List<Item> item);
}

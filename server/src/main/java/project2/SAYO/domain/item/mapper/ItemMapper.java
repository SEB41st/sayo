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
                //.itemDelivery(postRequest.isItemDelivery())
                .itemDeliveryPrice(postRequest.getItemDeliveryPrice())
                .itemPrice(postRequest.getItemPrice())
                .itemBody(postRequest.getItemBody())
                .itemDateStart(postRequest.getItemDateStart())
                .itemDateEnd(postRequest.getItemDateEnd())
                .latitude(postRequest.getLatitude())
                .longitude(postRequest.getLongitude())
                .itemStatus(Item.ItemStatus.ITEM_PROGRESS)
                .build();
    }

    default Item itemPatchDtoToItem(ItemDto.ItemPatch patchRequest){

        return Item.builder()
                .itemName(patchRequest.getItemName())
                .itemPicture(patchRequest.getItemPicture())
                //.itemDelivery(patchRequest.isItemDelivery())
                .itemDeliveryPrice(patchRequest.getItemDeliveryPrice())
                .itemPrice(patchRequest.getItemPrice())
                .itemBody(patchRequest.getItemBody())
                .itemDateStart(patchRequest.getItemDateStart())
                .itemDateEnd(patchRequest.getItemDateEnd())
                .latitude(patchRequest.getLatitude())
                .longitude(patchRequest.getLongitude())
                .itemStatus(Item.ItemStatus.ITEM_PROGRESS)
                .build();
    }
    default ItemDto.ItemResponse itemToItemResponseDto(Item item){

        return ItemDto.ItemResponse.builder()
                .itemId(item.getItemId())
                .itemName(item.getItemName())
                .itemPicture(item.getItemPicture())
                //.itemDelivery(item.isItemDelivery())
                .itemDeliveryPrice(item.getItemDeliveryPrice())
                .itemPrice(item.getItemPrice())
                .itemBody(item.getItemBody())
                .itemDateStart(item.getItemDateStart())
                .itemDateEnd(item.getItemDateEnd())
                .latitude(item.getLatitude())
                .longitude(item.getLongitude())
                .createdAt(item.getCreatedAt())
                .modifiedAt(item.getModifiedAt())
                .itemStatus(item.getItemStatus())
                .categoryId(item.getCategory().getCategoryId())
                .build();
    }
    List<ItemDto.ItemResponse> itemListToItemResponseList(List<Item> item);
}

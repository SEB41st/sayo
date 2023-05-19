package project2.SAYO.domain.shoppingCart.mapper;

import org.mapstruct.Mapper;
import project2.SAYO.domain.shoppingCart.dto.ShoppingCartItemDto;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCartItem;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ShoppingCartMapper {
    default ShoppingCartItemDto.Response shoppingCartToShoppingCartResponse(ShoppingCartItem shoppingCartItem) {

        return ShoppingCartItemDto.Response.builder()
                .itemId(shoppingCartItem.getItem().getItemId())
                .itemPicture(shoppingCartItem.getItem().getItemPicture())
                .itemPrice(shoppingCartItem.getItem().getItemPrice())
                .itemDeliveryPrice(shoppingCartItem.getItem().getItemDeliveryPrice())
                .itemName(shoppingCartItem.getItem().getItemName())
                .userId(shoppingCartItem.getUser().getId())
                .shoppingCartId(shoppingCartItem.getShoppingCartId())
                .shoppingCartSelected(shoppingCartItem.getShoppingCartSelected())
                .itemCount(shoppingCartItem.getItemCount())
                .orderCheck(shoppingCartItem.getOrderCheck())
                .createdAt(shoppingCartItem.getCreatedAt())
                .modifiedAt(shoppingCartItem.getModifiedAt())
                .build();
    }

    default List<ShoppingCartItemDto.Response> shoppingCartListToShoppingCartResponseList(List<ShoppingCartItem> shoppingCartItemList){

        return shoppingCartItemList.stream()
                .map(this::shoppingCartToShoppingCartResponse).collect(Collectors.toList());
    }
}

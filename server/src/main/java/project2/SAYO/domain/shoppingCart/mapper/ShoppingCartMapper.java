package project2.SAYO.domain.shoppingCart.mapper;

import org.mapstruct.Mapper;
import project2.SAYO.domain.shoppingCart.dto.ShoppingCartDto;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCart;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ShoppingCartMapper {
    default ShoppingCartDto.Response shoppingCartToShoppingCartResponse(ShoppingCart shoppingCart) {

        return ShoppingCartDto.Response.builder()
                .itemId(shoppingCart.getItem().getItemId())
                .userId(shoppingCart.getUser().getId())
                .shoppingCartId(shoppingCart.getShoppingCartId())
                .shoppingCartSelected(shoppingCart.isShoppingCartSelected())
                .createdAt(shoppingCart.getCreatedAt())
                .modifiedAt(shoppingCart.getModifiedAt())
                .build();
    }

    default List<ShoppingCartDto.Response> shoppingCartListToShoppingCartResponseList(List<ShoppingCart> shoppingCartList){

        return shoppingCartList.stream()
                .map(this::shoppingCartToShoppingCartResponse).collect(Collectors.toList());
    }
}
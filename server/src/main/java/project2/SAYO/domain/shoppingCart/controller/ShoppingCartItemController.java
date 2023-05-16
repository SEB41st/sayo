package project2.SAYO.domain.shoppingCart.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project2.SAYO.domain.shoppingCart.dto.ShoppingCartItemDto;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCartItem;
import project2.SAYO.domain.shoppingCart.mapper.ShoppingCartMapper;
import project2.SAYO.domain.shoppingCart.service.ShoppingCartItemService;
import project2.SAYO.global.Response.SingleResponseDto;
import project2.SAYO.global.loginresolver.LoginUserId;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/shoppingCarts")
@Validated
public class ShoppingCartItemController {
    private final ShoppingCartItemService shoppingCartItemService;
    private final ShoppingCartMapper mapper;

    // TODO POST : shoppingCart에 item 추가
    @PostMapping("items/{item-id}")
    public ResponseEntity postShoppingCart(@Valid @PathVariable("item-id") @Positive long itemId,
                                           @LoginUserId Long userId) {
        ShoppingCartItem shoppingCartItemForResponse = shoppingCartItemService.createShoppingCart(userId, itemId);
        ShoppingCartItemDto.Response shoppingCartResponse = mapper.shoppingCartToShoppingCartResponse(shoppingCartItemForResponse);

        return new ResponseEntity(new SingleResponseDto<>(shoppingCartResponse), HttpStatus.CREATED);
    }

    // TODO POST : shoppingCart의 item 수량 증가
    @PostMapping("items/add/{item-id}")
    public ResponseEntity addShoppigCartCount(@Valid @PathVariable("item-id") @Positive long itemId,
                                              @LoginUserId Long userId){
        ShoppingCartItem shoppingCartItemForResposne = shoppingCartItemService.addShoppingCartCount(userId, itemId);
        ShoppingCartItemDto.Response shoppingCartResponse = mapper.shoppingCartToShoppingCartResponse(shoppingCartItemForResposne);
        return new ResponseEntity(new SingleResponseDto<>(shoppingCartResponse), HttpStatus.CREATED);
    }

    // TODO POST : shoppingCart의 item 수량 감소
    @PostMapping("items/minus/{item-id}")
    public ResponseEntity minusShoppigCartCount(@Valid @PathVariable("item-id") @Positive long itemId,
                                              @LoginUserId Long userId){
        ShoppingCartItem shoppingCartItemForResposne = shoppingCartItemService.minusShoppingCartCount(userId, itemId);
        ShoppingCartItemDto.Response shoppingCartResponse = mapper.shoppingCartToShoppingCartResponse(shoppingCartItemForResposne);
        return new ResponseEntity(new SingleResponseDto<>(shoppingCartResponse), HttpStatus.CREATED);
    }
/*
    // TODO GET ONE >> 현재 사용X
    @GetMapping("/{shoppingCart-id}")
    public ResponseEntity getShoppingCart(@Valid @PathVariable("shoppingCart-id") @Positive long shoppingCartId,
                                          @LoginUserId Long userId) {
        ShoppingCartItem shoppingCartItemForResponse = shoppingCartItemService.findShoppingCart(userId, shoppingCartId);
        ShoppingCartItemDto.Response shoppingCartResponse = mapper.shoppingCartToShoppingCartResponse(shoppingCartItemForResponse);

        return new ResponseEntity(new SingleResponseDto<>(shoppingCartResponse), HttpStatus.OK);
    }

    // TODO GET ALL
    @GetMapping("/user/{user-id}/shoppingCart")
    public ResponseEntity getShoppingCarts(@Valid @PathVariable("user-id") long userId, @LoginUserId Long loginUserId) {
        List<ShoppingCartItem> shoppingCartItemList = shoppingCartItemService.findShoppingCarts(userId, loginUserId);
        List<ShoppingCartItemDto.Response> shoppingCartResponseList = mapper.shoppingCartListToShoppingCartResponseList(shoppingCartItemList);
        return new ResponseEntity(new SingleResponseDto<>(shoppingCartResponseList),HttpStatus.OK);
    }

    // TODO DELETE ONE
    @DeleteMapping("/{shoppingCart-id}")
    public ResponseEntity deleteShoppingCart(@Valid @PathVariable("shoppingCart-id") @Positive long shoppingCartId,
                                             @LoginUserId Long userId){
        shoppingCartItemService.deleteShoppingCart(userId, shoppingCartId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }*/
}

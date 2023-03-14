package project2.SAYO.domain.shoppingCart.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project2.SAYO.domain.shoppingCart.dto.ShoppingCartDto;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCart;
import project2.SAYO.domain.shoppingCart.mapper.ShoppingCartMapper;
import project2.SAYO.domain.shoppingCart.service.ShoppingCartService;
import project2.SAYO.global.Response.MultiResponseDto;
import project2.SAYO.global.Response.SingleResponseDto;
import project2.SAYO.global.loginresolver.LoginUserId;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/shoppingCarts")
@Validated
public class ShoppingCartController {
    private final ShoppingCartService shoppingCartService;
    private final ShoppingCartMapper mapper;

    // TODO POST
    @PostMapping("/{item-id}")
    public ResponseEntity postShoppingCart(@Valid @PathVariable("item-id") @Positive long itemId,
                                           @LoginUserId Long userId,
                                           @RequestBody ShoppingCartDto.Post shoppingCartPost) {
        shoppingCartPost.addItemId(itemId);
        ShoppingCart shoppingCartForResponse = shoppingCartService.createShoppingCart(userId, shoppingCartPost);
        ShoppingCartDto.Response shoppingCartResponse = mapper.shoppingCartToShoppingCartResponse(shoppingCartForResponse);

        return new ResponseEntity(new SingleResponseDto<>(shoppingCartResponse), HttpStatus.CREATED);
    }

    // TODO PATCH
    @PatchMapping("/{shoppingCart-id}")
    public ResponseEntity patchShoppingCart(@Valid @PathVariable("shoppingCart-id") @Positive long shoppingCartId,
                                            @LoginUserId Long userId,
                                            @RequestBody ShoppingCartDto.Patch shoppingCartPatch) {
        ShoppingCart shoppingCartForResponse = shoppingCartService.updateShoppingCart(userId, shoppingCartId,shoppingCartPatch);

        ShoppingCartDto.Response shoppingCartResponse = mapper.shoppingCartToShoppingCartResponse(shoppingCartForResponse);

        return new ResponseEntity(new SingleResponseDto<>(shoppingCartResponse), HttpStatus.OK);
    }

    // TODO GET ONE
    @GetMapping("/{shoppingCart-id}")
    public ResponseEntity getShoppingCart(@Valid @PathVariable("shoppingCart-id") @Positive long shoppingCartId,
                                          @LoginUserId Long userId) {
        ShoppingCart shoppingCartForResponse = shoppingCartService.findShoppingCart(userId, shoppingCartId);
        ShoppingCartDto.Response shoppingCartResponse = mapper.shoppingCartToShoppingCartResponse(shoppingCartForResponse);

        return new ResponseEntity(new SingleResponseDto<>(shoppingCartResponse), HttpStatus.OK);
    }

    // TODO GET ALL
    @GetMapping
    public ResponseEntity getShoppingCarts(@Positive @RequestParam int page,
                                           @Positive @RequestParam int size) {
        Page<ShoppingCart> shoppingCartPage = shoppingCartService.findShoppingCarts(page-1,size);
        List<ShoppingCart> shoppingCartList = shoppingCartPage.getContent();
        List<ShoppingCartDto.Response> shoppingCartResponseList = mapper.shoppingCartListToShoppingCartResponseList(shoppingCartList);
        return new ResponseEntity(new MultiResponseDto<>(shoppingCartResponseList,shoppingCartPage),HttpStatus.OK);
    }

    // TODO DELETE ONE
    @DeleteMapping("/{shoppingCart-id}")
    public ResponseEntity deleteShoppingCart(@Valid @PathVariable("shoppingCart-id") @Positive long shoppingCartId,
                                             @LoginUserId Long userId){
        shoppingCartService.deleteShoppingCart(userId, shoppingCartId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

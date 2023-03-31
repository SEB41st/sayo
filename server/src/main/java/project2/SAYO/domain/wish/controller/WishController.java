package project2.SAYO.domain.wish.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project2.SAYO.domain.wish.dto.WishDto;
import project2.SAYO.domain.wish.entity.Wish;
import project2.SAYO.domain.wish.mapper.WishMapper;
import project2.SAYO.domain.wish.service.WishService;
import project2.SAYO.global.Response.MultiResponseDto;
import project2.SAYO.global.Response.SingleResponseDto;
import project2.SAYO.global.loginresolver.LoginUserId;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/wishes")
@Validated
public class WishController {
    private final WishService wishService;
    private final WishMapper mapper;

    // TODO POST
    @PostMapping("/{item-id}")
    public ResponseEntity postWish(@Valid @PathVariable("item-id") @Positive long itemId,
                                   @LoginUserId Long userId) {
        Wish wishForResponse = wishService.createWish(userId, itemId);
        WishDto.Response wishResponse = mapper.wishToWishResponse(wishForResponse);

        return new ResponseEntity(new SingleResponseDto<>(wishResponse), HttpStatus.CREATED);
    }

    // TODO GET ONE
    @GetMapping("/{wish-id}")
    public ResponseEntity getWish(@Valid @PathVariable("wish-id") @Positive long wishId,
                                  @LoginUserId Long userId) {
        Wish wishForResponse = wishService.findWish(userId, wishId);
        WishDto.Response wishResponse = mapper.wishToWishResponse(wishForResponse);

        return new ResponseEntity(new SingleResponseDto<>(wishResponse), HttpStatus.OK);
    }

    // TODO GET ALL
    @GetMapping
    public ResponseEntity getWishes(@Positive @RequestParam int page,
                                           @Positive @RequestParam int size) {
        Page<Wish> wishPage = wishService.findWishes(page-1,size);
        List<Wish> wishList = wishPage.getContent();
        List<WishDto.Response> shoppingCartResponseList = mapper.WishListToWishResponseList(wishList);
        return new ResponseEntity(new MultiResponseDto<>(shoppingCartResponseList,wishPage),HttpStatus.OK);
    }

    // TODO DELETE ONE
    @DeleteMapping("/{wish-id}")
    public ResponseEntity deleteWish(@Valid @PathVariable("wish-id") @Positive long wishId,
                                     @LoginUserId Long userId){
        wishService.deleteWish(userId, wishId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

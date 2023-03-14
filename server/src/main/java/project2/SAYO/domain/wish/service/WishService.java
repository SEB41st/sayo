package project2.SAYO.domain.wish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.item.service.ItemService;
import project2.SAYO.domain.shoppingCart.dto.ShoppingCartDto;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCart;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.service.UserService;
import project2.SAYO.domain.wish.dto.WishDto;
import project2.SAYO.domain.wish.entity.Wish;
import project2.SAYO.domain.wish.repository.WishRepository;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WishService {
    private final WishRepository wishRepository;
    private final UserService userService;
    private final ItemService itemService;

    // TODO POST
    @Transactional
    public Wish createWish(Long userId, WishDto.Post wishPost) {
        Wish createWish = new Wish();
        User findUser = userService.findVerifiedUser(userId);
        createWish.addUser(findUser);
        Item findItem = itemService.findVerifiedItem(wishPost.getItemId());
        createWish.addItem(findItem);
        createWish.ChangeWishSelected(wishPost.isWishSelected());

        return wishRepository.save(createWish);
    }

    // TODO PATCH
    @Transactional
    public Wish updateWish(Long userId, long wishId, WishDto.Patch wishPatch) {
        Wish findWish = findVerifiedWish(wishId);
        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(!findWish.getUser().getId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
        findWish.ChangeWishSelected(wishPatch.isWishSelected());

        return wishRepository.save(findWish);
    }

    // TODO GET
    @Transactional
    public Wish findWish(Long userId, long wishId) {
        Wish findWish = findVerifiedWish(wishId);
        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(!findWish.getUser().getId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }

        return findWish;
    }

    // TODO GET ALL
    @Transactional
    public Page<Wish> findWishes(int page, int size) {
        return wishRepository.findAll(PageRequest.of(page,size, Sort.by("wishId").descending()));
    }

    // TODO DELETE ONE
    @Transactional
    public void deleteWish(Long userId, long wishId) {
        Wish findWish = findVerifiedWish(wishId);
        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(!findWish.getUser().getId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
        wishRepository.delete(findWish);
    }

    // TODO VERIFIED
    public Wish findVerifiedWish(long wishId) {
        Optional<Wish> optionalWish = wishRepository.findById(wishId);

        return optionalWish.orElseThrow(()->new BusinessLogicException(ExceptionCode.WISH_NOT_FOUND));
    }
}

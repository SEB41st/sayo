package project2.SAYO.domain.wish.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.item.service.ItemService;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.service.UserService;
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
    public Wish createWish(Long userId, Long itemId) {
        User findUser = userService.findVerifiedUser(userId);
        Item findItem = itemService.findVerifiedItem(itemId);

        Wish createWish = findByUserAndItem(findUser, findItem);
        createWish.addUser(findUser);
        createWish.addItem(findItem);
        if (createWish.isWishSelected() != Boolean.TRUE) {
            createWish.changeWishSelected(Boolean.FALSE);
        } else {
            createWish.changeWishSelected(Boolean.TRUE);
        }

        return wishRepository.save(createWish);
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

    public Wish findByUserAndItem(User user, Item item){
        Optional<Wish> optionalWish = this.wishRepository.findByUserAndItem(user, item);

        if(optionalWish.isPresent()){
            return optionalWish.get();
        }else{
            return new Wish();
        }
    }
}

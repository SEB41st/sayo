package project2.SAYO.domain.shoppingCart.service;

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
import project2.SAYO.domain.shoppingCart.repository.ShoppingCartRepository;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.service.UserService;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShoppingCartService {
    private final ShoppingCartRepository shoppingCartRepository;
    private final UserService userService;
    private final ItemService itemService;

    // TODO POST
    @Transactional
    public ShoppingCart createShoppingCart(ShoppingCartDto.Post shoppingCartPost) {
        ShoppingCart createShoppingCart = new ShoppingCart();
        User findUser = userService.findUser(userService.getCurrentUser().getUserId());
        createShoppingCart.addUser(findUser);
        Item findItem = itemService.findVerifiedItem(shoppingCartPost.getItemId());
        createShoppingCart.addItem(findItem);
        createShoppingCart.ChangeShoppingCartSelected(shoppingCartPost.isShoppingCartSelected());

        return shoppingCartRepository.save(createShoppingCart);
    }

    // TODO PATCH
    @Transactional
    public ShoppingCart updateShoppingCart(long shoppingCartId, ShoppingCartDto.Patch shoppingCartPatch) {
        ShoppingCart findShoppingCart = findVerifiedShoppingCart(shoppingCartId);
        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(userService.getCurrentUser().getUserId() != findShoppingCart.getUser().getUserId()) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
        findShoppingCart.ChangeShoppingCartSelected(shoppingCartPatch.isShoppingCartSelected());

        return shoppingCartRepository.save(findShoppingCart);
    }

    // TODO GET
    @Transactional
    public ShoppingCart findShoppingCart(long shoppingCartId) {
        ShoppingCart findShoppingCart = findVerifiedShoppingCart(shoppingCartId);
        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(userService.getCurrentUser().getUserId() != findShoppingCart.getUser().getUserId()) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }

        return findShoppingCart;
    }

    // TODO GET ALL
    @Transactional
    public Page<ShoppingCart> findShoppingCarts(int page, int size) {
        return shoppingCartRepository.findAll(PageRequest.of(page,size, Sort.by("shoppingCartId").descending()));
    }

    // TODO DELETE ONE
    @Transactional
    public void deleteShoppingCart(long shoppingCartId) {
        ShoppingCart findShoppingCart = findVerifiedShoppingCart(shoppingCartId);
        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(userService.getCurrentUser().getUserId() != findShoppingCart.getUser().getUserId()) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
        shoppingCartRepository.delete(findShoppingCart);
    }

    // TODO VERIFIED
    public ShoppingCart findVerifiedShoppingCart(long shoppingCartId) {
        Optional<ShoppingCart> optionalShoppingCart = shoppingCartRepository.findById(shoppingCartId);
        ShoppingCart findShoppingCart = optionalShoppingCart.orElseThrow(()->new BusinessLogicException(ExceptionCode.SHOPPINGCART_NOT_FOUND));

        return findShoppingCart;
    }

}

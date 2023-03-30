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
    public ShoppingCart createShoppingCart(long userId, Long itemId) {
        User findUser = userService.findVerifiedUser(userId);
        Item findItem = itemService.findVerifiedItem(itemId);

        ShoppingCart createShoppingCart = findByUserAndItem(findUser,findItem);
        createShoppingCart.addUser(findUser);
        createShoppingCart.addItem(findItem);
        createShoppingCart.ChangeShoppingCartSelected(shoppingCartPost.isShoppingCartSelected());

        return shoppingCartRepository.save(createShoppingCart);
    }

    // TODO GET
    @Transactional
    public ShoppingCart findShoppingCart(long userId, long shoppingCartId) {
        ShoppingCart findShoppingCart = findVerifiedShoppingCart(shoppingCartId);
        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(!findShoppingCart.getUser().getId().equals(userId)) {
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
    public void deleteShoppingCart(long userId, long shoppingCartId) {
        ShoppingCart findShoppingCart = findVerifiedShoppingCart(shoppingCartId);
        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(!findShoppingCart.getUser().getId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
        shoppingCartRepository.delete(findShoppingCart);
    }

    // TODO VERIFIED
    public ShoppingCart findVerifiedShoppingCart(long shoppingCartId) {
        Optional<ShoppingCart> optionalShoppingCart = shoppingCartRepository.findById(shoppingCartId);

        return optionalShoppingCart.orElseThrow(() -> new BusinessLogicException(ExceptionCode.SHOPPINGCART_NOT_FOUND));
    }

    // TODO FIND_BY_USER_AND_ITEM
    public ShoppingCart findByUserAndItem(User user, Item item) {
        Optional<ShoppingCart> optionalShoppingCart = this.shoppingCartRepository.findByUserAndItem(user,item);

        if(optionalShoppingCart.isPresent()) {
            return optionalShoppingCart.get();
        }else {
            return new ShoppingCart();
        }
    }

}

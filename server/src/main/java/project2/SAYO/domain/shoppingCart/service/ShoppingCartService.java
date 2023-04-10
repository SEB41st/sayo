package project2.SAYO.domain.shoppingCart.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.item.service.ItemService;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCart;
import project2.SAYO.domain.shoppingCart.repository.ShoppingCartRepository;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.service.UserService;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

        if(createShoppingCart.getShoppingCartSelected() != Boolean.TRUE){
            createShoppingCart.changeShoppingCartSelected(Boolean.TRUE);
        }else{
            createShoppingCart.changeShoppingCartSelected(Boolean.FALSE);
        }

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

        //shoppingCart가 false라면 exception 발생
        if(findShoppingCart.getShoppingCartSelected() != Boolean.TRUE){
            throw new BusinessLogicException(ExceptionCode.SHOPPINGCART_NOT_FOUND);
        }

        return findShoppingCart;
    }

    // TODO GET ALL
    @Transactional
    public List<ShoppingCart> findShoppingCarts(long userId) {
        //shoppingCart에서 선택한 것(true 값)만 Get으로 받아올 수 있도록 작성
        return shoppingCartRepository.findAll().stream()
                .filter(shoppingCart -> shoppingCart.getUser().getId() == userId)
                .filter(a -> a.getShoppingCartSelected() == Boolean.TRUE)
                .collect(Collectors.toList());
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

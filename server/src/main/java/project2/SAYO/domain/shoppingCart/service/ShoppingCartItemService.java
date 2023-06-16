package project2.SAYO.domain.shoppingCart.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.item.service.ItemService;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCartItem;
import project2.SAYO.domain.shoppingCart.repository.ShoppingCartItemRepository;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.service.UserService;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShoppingCartItemService {
    private final ShoppingCartItemRepository shoppingCartItemRepository;
    private final UserService userService;
    private final ItemService itemService;

    // TODO POST : 수량 변경은 불가능
    @Transactional
    public ShoppingCartItem createShoppingCart(long userId, Long itemId) {
        // User와 Item을 찾아서 가져옴
        User findUser = userService.findVerifiedUser(userId);
        Item findItem = itemService.findVerifiedItem(itemId);

        // ShoppingCart를 찾고, 없으면 새로운 쇼핑카트를 생성
        ShoppingCartItem createShoppingCartItem = findByUserAndItem(findUser,findItem);

        // ShoppingCart에 User와 Item을 set
        createShoppingCartItem.addUser(findUser);
        createShoppingCartItem.addItem(findItem);
        //Optional<ShoppingCartItem> shoppingCartTotal = this.shoppingCartItemRepository.findByUser(findUser);
        //ShoppingCartItem totalCount = shoppingCartTotal.get();

        // 기본 주문 선택은 False로 설정
        createShoppingCartItem.changeOrderCheck(Boolean.TRUE);

        if(createShoppingCartItem.getShoppingCartSelected() != Boolean.TRUE){
            createShoppingCartItem.changeShoppingCartSelected(Boolean.TRUE);
            createShoppingCartItem.addItemCount(createShoppingCartItem.getItemCount() +1);
            // User가 가진 shoppingCartItem을 조회하여 계속 누적 Count 진행
            //totalCount.addItemTotalCount(totalCount.getItemTotalCount()+1);
        }/*else{
            // shoppingCart에서 item을 뺄 경우에는 count 값 또한 초기화 진행
            createShoppingCartItem.changeShoppingCartSelected(Boolean.FALSE);
        }*/

        return shoppingCartItemRepository.save(createShoppingCartItem);
    }

    // TODO : shoppingCart의 item 수량 추가
    @Transactional
    public ShoppingCartItem addShoppingCartCount(long userId, long itemId){
        User findUser = userService.findVerifiedUser(userId);
        Item findItem = itemService.findVerifiedItem(itemId);

        ShoppingCartItem createShoppingCartItem = findByUserAndItem(findUser,findItem);

        if(createShoppingCartItem == null){
            throw new BusinessLogicException(ExceptionCode.SHOPPINGCART_NOT_FOUND);
        }else{
            createShoppingCartItem.addItemCount(createShoppingCartItem.getItemCount()+1);
        }

        return shoppingCartItemRepository.save(createShoppingCartItem);
    }

    // TODO : shoppingCart의 item 수량 감소
    @Transactional
    public ShoppingCartItem minusShoppingCartCount(long userId, long itemId){
        User findUser = userService.findVerifiedUser(userId);
        Item findItem = itemService.findVerifiedItem(itemId);

        ShoppingCartItem createShoppingCartItem = findByUserAndItem(findUser,findItem);

        if(createShoppingCartItem == null){
            throw new BusinessLogicException(ExceptionCode.SHOPPINGCART_NOT_FOUND);
        }else{
            if(createShoppingCartItem.getItemCount() <= 1){
                throw new BusinessLogicException(ExceptionCode.SHOPPINGCART_CANNOT_MINUS);
            }else {
                createShoppingCartItem.addItemCount(createShoppingCartItem.getItemCount() - 1);
            }
        }

        return shoppingCartItemRepository.save(createShoppingCartItem);
    }

    // TODO POST : 주문할 상품 선택 여부
    @Transactional
    public ShoppingCartItem itemCheck(long userId, long shoppingCartId){
        // 쇼핑카트 존재 여부 확인
        ShoppingCartItem findShoppingCartItem = findVerifiedShoppingCart(shoppingCartId);

        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(!findShoppingCartItem.getUser().getId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }

        // 쇼핑카트에서 주문할 상품 선택 진행
        if(findShoppingCartItem.getOrderCheck() != Boolean.TRUE){
            findShoppingCartItem.changeOrderCheck(Boolean.TRUE);
        }else{
            findShoppingCartItem.changeOrderCheck(Boolean.FALSE);
        }
        return shoppingCartItemRepository.save(findShoppingCartItem);
    }

    // TODO GET
    @Transactional
    public ShoppingCartItem findShoppingCart(long userId, long shoppingCartId) {
        ShoppingCartItem findShoppingCartItem = findVerifiedShoppingCart(shoppingCartId);
        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(!findShoppingCartItem.getUser().getId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }

        //shoppingCart가 false라면 exception 발생
        if(findShoppingCartItem.getShoppingCartSelected() != Boolean.TRUE){
            throw new BusinessLogicException(ExceptionCode.SHOPPINGCART_NOT_FOUND);
        }

        return findShoppingCartItem;
    }

    // TODO GET ALL
    @Transactional
    public List<ShoppingCartItem> findShoppingCarts(long userId, long loginUserId) {

        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(loginUserId != userId) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
        log.info("loginUserId1 = {}", loginUserId);
        log.info("userId1 = {}", userId);

        //shoppingCart에서 선택한 것(true 값)만 Get으로 받아올 수 있도록 작성
        return shoppingCartItemRepository.findAll().stream()
                .filter(shoppingCartItem -> shoppingCartItem.getUser().getId() == userId)
                .filter(a -> a.getShoppingCartSelected() == Boolean.TRUE)
                .collect(Collectors.toList());
    }

    // TODO : 주문할 상품 리스트 조회(checkOrder == true)
    @Transactional
    public List<ShoppingCartItem> findOrderLists(long userId, long loginUserId){
        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(loginUserId != userId) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
        return shoppingCartItemRepository.findAll().stream()
                .filter(shoppingCartItem -> shoppingCartItem.getUser().getId() == userId)
                .filter(a -> a.getOrderCheck() == Boolean.TRUE)
                .collect(Collectors.toList());
    }

    // TODO DELETE ONE
    @Transactional
    public void deleteShoppingCart(long userId, long shoppingCartId) {
        ShoppingCartItem findShoppingCartItem = findVerifiedShoppingCart(shoppingCartId);
        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(!findShoppingCartItem.getUser().getId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }

        //쇼핑카트에서 삭제할 경우 다시 false로 변경 및 count 0으로 초기화
        findShoppingCartItem.changeShoppingCartSelected(Boolean.FALSE);
        findShoppingCartItem.addItemCount(0);

        shoppingCartItemRepository.delete(findShoppingCartItem);
    }

    @Transactional
    public void deleteShoppingCarts(long userId){
        List<ShoppingCartItem> findShoppingCartList = shoppingCartItemRepository.findAll().stream()
                .filter(a -> a.getUser().getId() == userId)
                .filter(b -> b.getOrderCheck() == Boolean.TRUE)
                .filter(c -> c.getShoppingCartSelected() == Boolean.TRUE)
                        .collect(Collectors.toList());
        log.info("findShoppingCartList Size = {}", findShoppingCartList.size());

        for(ShoppingCartItem s : findShoppingCartList){
            shoppingCartItemRepository.delete(s);
        }
    }

    // TODO VERIFIED
    public ShoppingCartItem findVerifiedShoppingCart(long shoppingCartId) {
        Optional<ShoppingCartItem> optionalShoppingCart = shoppingCartItemRepository.findById(shoppingCartId);

        return optionalShoppingCart.orElseThrow(() -> new BusinessLogicException(ExceptionCode.SHOPPINGCART_NOT_FOUND));
    }

    // TODO FIND_BY_USER_AND_ITEM
    public ShoppingCartItem findByUserAndItem(User user, Item item) {
        Optional<ShoppingCartItem> optionalShoppingCart = this.shoppingCartItemRepository.findByUserAndItem(user,item);

        if(optionalShoppingCart.isPresent()) {
            return optionalShoppingCart.get();
        }else {
            return new ShoppingCartItem();
        }
    }


}

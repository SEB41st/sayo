package project2.SAYO.domain.order.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project2.SAYO.domain.order.entity.OrderItem;
import project2.SAYO.domain.order.repository.OrderItemRepository;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCartItem;
import project2.SAYO.domain.shoppingCart.repository.ShoppingCartItemRepository;
import project2.SAYO.domain.shoppingCart.service.ShoppingCartItemService;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.service.UserService;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;
import project2.SAYO.global.util.CustomBeanUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;
    private final CustomBeanUtils<OrderItem> orderCustomBeanUtils;
    private final UserService userService;
    private final ShoppingCartItemRepository shoppingCartItemRepository;
    private final ShoppingCartItemService shoppingCartItemService;


    // TODO POST : 한 상품만 주문
    /*
    * "data": {
        "orderItemId": 1,
        "orderStatus": null,
        "userId": 1,
        "itemId": null,
        "itemPicture": null,
        "itemName": null,
        "itemCount": 3,
        "totalCount": 3,
        "itemTotalPrice": 0,
        "createdAt": "2023-05-23T13:57:45.2406057",
        "modifiedAt": "2023-05-23T13:57:45.2406057"
        }
    * 현재 데이터 출력 상황 >> new OrderItem으로 주문하기를 생성해서 나오는 문제로 Picture의 경우에는 s3문제일 수도 잇으므로 새략 진행
    * 나머지는 잘 출력될 수 있도록 수정 필요*/
    @Transactional
    public OrderItem createOrder(long userId, long shoppingCartId){
        User findUser = userService.findVerifiedUser(userId);
        ShoppingCartItem findShoppingCart = shoppingCartItemService.findShoppingCart(userId, shoppingCartId);

        // shoppingCartItem의 orderCheck가 true라면 주문 진행
        if(findShoppingCart.getOrderCheck() != Boolean.TRUE){
            throw new BusinessLogicException(ExceptionCode.SHOPPINGCART_NOT_CHECK);
        }

        // 동일한 상품도 주문 가능하기에 주문하기는 계속 새롭게 생성
        OrderItem orderItem = new OrderItem();

        orderItem.setUser(findUser);
        orderItem.setItemId(findShoppingCart.getItem().getItemId());
        orderItem.setItemName(findShoppingCart.getItem().getItemName());
        orderItem.setItemPicture(findShoppingCart.getItem().getItemPicture());
        orderItem.setItemPrice(findShoppingCart.getItem().getItemPrice());
        orderItem.setItemCount(findShoppingCart.getItemCount());
        orderItem.setTotalCount(findShoppingCart.getItemCount());
        orderItem.setItemTotalPrice(findShoppingCart.getItem().getItemPrice()*findShoppingCart.getItemCount());
        orderItemRepository.save(orderItem);

        // order.ChangeOrderStatus(); >> 결제 시스템 구현 시 함께 진행

        // 주문한 상품 쇼핑카트에서 삭제
        shoppingCartItemRepository.delete(findShoppingCart);
        return orderItem;
    }

    // TODO POST : 선택된 것 전체 주문
    // ShoppingCartItem에서 orderCheck가 true인 것들만 주문 진행
   /* @Transactional
    public OrderItem createOrders(long userId, long shoppingCartId) {
        // 현재 로그인 한 유저 찾아오기
        User currentUser = userService.findVerifiedUser(userId);
        // ShoppingCart에서 로그인한 유저 + OrderCheck가 true인 것들 필터링 해서 저장
        List<ShoppingCartItem> findShpopingCart = shoppingCartItemRepository.findAll().stream()
                .filter(shoppingCartItem -> shoppingCartItem.getUser().getId() == userId)
                .filter(a -> a.getOrderCheck() == Boolean.TRUE)
                .collect(Collectors.toList());

        // findShoppingCart가 list 형식 >> order 생성을 위해 shoppingCartItem을
        // list 형태로 변경하거나 list를 하나하나 가지고 와야할 수 있음 >> find
        OrderItem findOrder = findByUserAndShoppingCarts(currentUser, findShpopingCart);
        findOrder.setUser(currentUser); // 현재 로그인한 유저를 오더에 넣어줌.
        //findOrder.addShoppingCart(findShpopingCart);

        return orderItemRepository.save(findOrder);
    }*/
/*
    // TODO PATCH
    @Transactional
    public Order updateOrder(long userId, Order order) {
        Order findOrder = findVerifiedOrder(order.getOrderId());

        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(!findOrder.getUser().getId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }

        Order updateOrder = orderCustomBeanUtils.copyNonNullProperties(order, findOrder);
        updateOrder.ChangeOrderStatus(order.getOrderStatus());
        return orderRepository.save(updateOrder);
    }

    // TODO GET ALL
    public Page<Order> getOrders(int page, int size) {
        return orderRepository.findAll(PageRequest.of(page,size, Sort.by("orderId").descending()));
    }

    // TODO GET
    @Transactional
    public Order getOrder(long userId, long orderId) {
        Order findOrder = findVerifiedOrder(orderId);

        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(!findOrder.getUser().getId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }

        return findVerifiedOrder(orderId);
    }

    // TODO DELETE
    @Transactional
    public void deleteOrder(long userId, long orderId) {
        Order findOrder = findVerifiedOrder(orderId);

        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(!findOrder.getUser().getId().equals(userId)) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
        findOrder.ChangeOrderStatus(Order.OrderStatus.ORDER_CANCELLATION);
    }
*/
    // TODO FIND VERIFIED
    public OrderItem findVerifiedOrder(long orderId) {
        Optional<OrderItem> optionalOrder = orderItemRepository.findById(orderId);
        OrderItem findOrder = optionalOrder.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND)
        );
        return findOrder;
    }

    /*public Order findByUserAndShoppingCart(User user, ShoppingCartItem shoppingCartItem) {
        Optional<Order> optionalOrder = this.orderRepository.findByUserAndShoppingCart(user,shoppingCartItem);

        if(optionalOrder.isPresent()) {
            return optionalOrder.get();
        }else {
            return new Order();
        }
    }*/

   /* public OrderItem findByUserAndShoppingCarts(User user, List<ShoppingCartItem> shoppingCartItem) {
        Optional<OrderItem> optionalOrder = this.orderItemRepository.findByUserAndShoppingCartItems(user,shoppingCartItem);

        if(optionalOrder.isPresent()) {
            return optionalOrder.get();
        }else {
            return new OrderItem();
        }
    }*/


}

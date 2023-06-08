package project2.SAYO.domain.order.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project2.SAYO.domain.item.entity.Item;
import project2.SAYO.domain.item.service.ItemService;
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
    private final ItemService itemService;


    // TODO POST : 한 상품만 주문(Item에서 주문하기 버튼 눌렀을 경우)
    @Transactional
    public OrderItem createOrder(long userId, long itemId){
        User findUser = userService.findVerifiedUser(userId);
        Item findItem = itemService.findVerifiedItem(itemId);

        // 동일한 상품도 주문 가능하기에 주문하기는 계속 새롭게 생성
        OrderItem orderItem = new OrderItem();

        orderItem.setUser(findUser);
        orderItem.setItemId(findItem.getItemId());
        orderItem.setItemName(findItem.getItemName());
        orderItem.setItemPicture(findItem.getItemPicture());
        orderItem.setItemPrice(findItem.getItemPrice());
        orderItem.setItemCount(1);
        orderItem.setTotalCount(1);
        orderItem.setItemTotalPrice(findItem.getItemPrice());
        orderItemRepository.save(orderItem);

        // order.ChangeOrderStatus(); >> 결제 시스템 구현 시 함께 진행
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

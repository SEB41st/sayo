package project2.SAYO.domain.order.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import project2.SAYO.domain.order.entity.Order;
import project2.SAYO.domain.order.repository.OrderRepository;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.service.UserService;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;
import project2.SAYO.global.util.CustomBeanUtils;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final CustomBeanUtils<Order> orderCustomBeanUtils;
    private final UserService userService;

    // TODO POST
    public Order createOrder(Order order) {
        User currentUser = userService.getCurrentUser();
        order.addUser(currentUser); // 현재 로그인한 유저를 오더에 넣어줌.

        return orderRepository.save(order);
    }

    // TODO PATCH
    public Order updateOrder(Order order) {
        Order findOrder = findVerifiedOrder(order.getOrderId());

        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(userService.getCurrentUser().getUserId() != findOrder.getUser().getUserId()) {
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
    public Order getOrder(long orderId) {
        Order findOrder = findVerifiedOrder(orderId);

        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(userService.getCurrentUser().getUserId() != findOrder.getUser().getUserId()) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }

        return findVerifiedOrder(orderId);
    }

    // TODO DELETE
    public void deleteOrder(long orderId) {
        Order findOrder = findVerifiedOrder(orderId);
        // 현재 로그인한 유저가 주문을 작성한 유저와 같은지 확인
        if(userService.getCurrentUser().getUserId() != findOrder.getUser().getUserId()) {
            throw new BusinessLogicException(ExceptionCode.USER_UNAUTHORIZED);
        }
        findOrder.ChangeOrderStatus(Order.OrderStatus.ORDER_CANCELLATION);
    }

    // TODO FIND VERIFIED
    public Order findVerifiedOrder(long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        Order findOrder = optionalOrder.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND)
        );
        return findOrder;
    }
}

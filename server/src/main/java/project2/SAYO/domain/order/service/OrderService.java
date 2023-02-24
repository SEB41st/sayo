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
import project2.SAYO.global.util.CustomBeanUtils;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final CustomBeanUtils<Order> orderCustomBeanUtils;

    // TODO POST
    public Order createOrder(Order order) {
        /*User findUser =
        order.addUser(findUser);*/
        //user service에서 현재 유저 찾아서 넣고 저장.


        return orderRepository.save(order);
    }

    // TODO PATCH
    public Order patchOrder(Order order) {
        Order findOrder = findVerifiedOrder(order.getOrderId());
        Order updateOrder = orderCustomBeanUtils.copyNonNullProperties(order, findOrder);
        updateOrder.CurOrderStatus(order.getOrderStatus());
        return orderRepository.save(updateOrder);
    }

    // TODO GET ALL
    public Page<Order> getOrders(int page, int size) {
        return orderRepository.findAll(PageRequest.of(page,size, Sort.by("orderId").descending()));
    }

    // TODO DELETE
    public void deleteOrder(long orderId) {
        orderRepository.deleteById(orderId);
    }

    // TODO FIND VERIFIED
    public Order findVerifiedOrder(long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        Order findOrder = optionalOrder.orElseThrow(
//                () -> new Busi
        );
        return findOrder;
    }
}

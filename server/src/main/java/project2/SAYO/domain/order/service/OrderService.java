package project2.SAYO.domain.order.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import project2.SAYO.domain.order.entity.Order;
import project2.SAYO.domain.order.repository.OrderRepository;
import project2.SAYO.domain.payment.entity.Payment;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCartItem;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    public void createOrder(User user){
        Order order = new Order();
        order.setUser(user);
        orderRepository.save(order);
    }

    public void addOrder(User user, List<ShoppingCartItem> shoppingCartItemList, Payment payment){
        Order order = Order.createOrder(user, shoppingCartItemList);
        order.setOrderName(payment.getOrderName());
        order.setAmount(payment.getAmount());
        order.setOrderCode(payment.getOrderCode());
        orderRepository.save(order);
    }

    public List<Order> getOrderList(){
        return orderRepository.findAll();
    }

    public Order getOrder(long id){
       Order order = findVerifiedOrder(id);
       log.info("## OrderService order ={}", order);
       return order;
    }

    public Order findVerifiedOrder(long id){
        Optional<Order> optionalOrder = orderRepository.findById(id);
        log.info("## OrderService optionalOrder ={}", optionalOrder);
        return optionalOrder.orElseThrow(() -> new BusinessLogicException(ExceptionCode.SHOPPINGCART_NOT_FOUND));

    }
}

package project2.SAYO.domain.order.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import project2.SAYO.domain.order.entity.Order;
import project2.SAYO.domain.order.repository.OrderRepository;
import project2.SAYO.domain.payment.entity.Payment;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCartItem;
import project2.SAYO.domain.user.entity.User;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class OrderService {
    private static OrderRepository orderRepository;

    public void createOrder(User user){
        Order order = new Order();
        order.setUser(user);
        orderRepository.save(order);
    }

    public static void addOrder(User user, List<ShoppingCartItem> shoppingCartItemList, Payment payment){
        Order order = Order.createOrder(user, shoppingCartItemList);
        order.setOrderName(payment.getOrderName());
        order.setAmount(payment.getAmount());
        order.setOrderId(payment.getOrderId());
        orderRepository.save(order);
    }

    public List<Order> getOrderList(){
        return orderRepository.findAll();
    }

    public Order getOrder(long id){
        return orderRepository.findById(id).get();
    }
}

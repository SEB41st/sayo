package project2.SAYO.domain.order.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import project2.SAYO.domain.item.entity.Item;
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
import java.util.stream.Collectors;

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

    public void addOrder(User user, List<Item> shoppingCartItemList, Payment payment){
        Order order = Order.createOrder(user, shoppingCartItemList);
        order.setOrderName(payment.getOrderName());
        order.setAmount(payment.getAmount());
        order.setOrderCode(payment.getOrderCode());
        orderRepository.save(order);
    }

    public List<Order> getOrderList(long userId){
        log.info("userId2 = {}", userId);
       /* List<Order> list = orderRepository.findByUserId(userId);
        return list;*/

        return orderRepository.findAll().stream()
                .filter(a -> a.getUser() != null && a.getUser().getId() == userId)
                .collect(Collectors.toList());

        /*return orderRepository.findAll().stream()
                .filter(a->a.getUser().getId()==userId)
                .collect(Collectors.toList());*/
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

    public void deleteAll(){
       orderRepository.deleteAll();
    }
}

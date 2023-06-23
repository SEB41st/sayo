package project2.SAYO.domain.order.controller;

import com.sun.xml.bind.v2.runtime.unmarshaller.XsiNilLoader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project2.SAYO.domain.order.dto.OrderResponseDto;
import project2.SAYO.domain.order.entity.Order;
import project2.SAYO.domain.order.mapper.OrderMapper;
import project2.SAYO.domain.order.service.OrderService;
import project2.SAYO.domain.payment.entity.Payment;
import project2.SAYO.domain.payment.repository.PaymentRepository;
import project2.SAYO.domain.shoppingCart.entity.ShoppingCartItem;
import project2.SAYO.domain.shoppingCart.repository.ShoppingCartItemRepository;
import project2.SAYO.domain.user.service.UserService;
import project2.SAYO.global.Response.SingleResponseDto;
import project2.SAYO.global.loginresolver.LoginUserId;
import retrofit2.http.Path;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderMapper mapper;
    private final OrderService orderService;

    // TODO : 주문 완료한 상품 조회
    @GetMapping("/{id}")
    public ResponseEntity orderGet(@PathVariable("id") Long id){
        Order order = orderService.getOrder(id);
        log.info("## order is created!! ={}",order);
        OrderResponseDto response = mapper.orderToOrderResponseDto(order);
        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity orderGetList() {
        List<Order> orderList = orderService.getOrderList();
        List<OrderResponseDto> response = mapper.orderListToOrderResponseList(orderList);
        return new ResponseEntity(response, HttpStatus.OK);
    }


}

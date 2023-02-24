package project2.SAYO.domain.order.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project2.SAYO.domain.order.dto.OrderDto;
import project2.SAYO.domain.order.entity.Order;
import project2.SAYO.domain.order.mapper.OrderMapper;
import project2.SAYO.domain.order.service.OrderService;
import project2.SAYO.global.Response.MultiResponseDto;
import project2.SAYO.global.Response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;
    private final OrderMapper mapper;

    // TODO POST
    @PostMapping
    public ResponseEntity postOrder(@RequestBody OrderDto.OrderRequest orderRequest) {
        Order orderForService = mapper.orderRequestToOrder(orderRequest);
        Order orderForResponse = orderService.createOrder(orderForService);
        OrderDto.OrderResponse response= mapper.orderToOrderResponse(orderForResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    // TODO PATCH
    @PatchMapping("/{order-id}")
    public ResponseEntity patchOrder(@Valid @PathVariable("order-id") @Positive long orderId,
                                     @RequestBody OrderDto.OrderRequest orderRequest) {
        Order orderForService = mapper.orderRequestToOrder(orderRequest);
        orderForService.addOrderId(orderId);
        Order orderForResponse = orderService.patchOrder(orderForService);
        OrderDto.OrderResponse response = mapper.orderToOrderResponse(orderForResponse);

        return new ResponseEntity(new SingleResponseDto<>(response),HttpStatus.OK);
    }

    // TODO GET ALL
    @GetMapping
    public ResponseEntity getOrders(@Valid @Positive @RequestParam int page,
                                    @Positive @RequestParam int size) {
        Page<Order> orderPage = orderService.getOrders(page -1, size);
        List<Order> orderList = orderPage.getContent();

        return new ResponseEntity(new MultiResponseDto<>(mapper.orderListToOrderResponseList(orderList),orderPage),HttpStatus.OK);
    }

    // TODO GET
    @GetMapping("/{order-id}")
    public ResponseEntity getOrder(@Valid @Positive @PathVariable("order-id") long orderId) {
        Order findOrder = orderService.findVerifiedOrder(orderId);

        return new ResponseEntity(new SingleResponseDto<>(findOrder),HttpStatus.OK);
    }

    // TODO DELETE
    @DeleteMapping("/{order-id}")
    public ResponseEntity deleteOrder(@Valid @Positive @PathVariable("order-id") long orderId) {
        orderService.deleteOrder(orderId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}

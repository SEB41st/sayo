package project2.SAYO.domain.order.Controller;

import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project2.SAYO.domain.order.dto.OrderItemDto;
import project2.SAYO.domain.order.entity.OrderItem;
import project2.SAYO.domain.order.mapper.OrderItemMapper;
import project2.SAYO.domain.order.service.OrderItemService;
import project2.SAYO.global.Response.SingleResponseDto;
import project2.SAYO.global.loginresolver.LoginUserId;

import javax.validation.Valid;
import java.io.IOException;

@Slf4j
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/orderItems")
public class OrderItemController {
    private final OrderItemService orderItemService;
    private final OrderItemMapper mapper;

    // Iamport 결제 검증 컨트롤러

    // 프론트에서 받은 PG사 결괏값을 통해 아임포트 토큰 발행
   /* @PostMapping("/verifyIamport/{imp_uid}")
    public IamportResponse<Payment> paymentByImpUid(@PathVariable String imp_uid) throws IamportResponseException, IOException {
        log.info("paymentByImpUid 진입");
        return iamportClient.paymentByImpUid(imp_uid);
    }

    // TODO POST : 장바구니 한 상품만 주문하기
    @PostMapping("/shoppingCart/{shoppingCart-id}")
    public ResponseEntity postOrder(@Valid @PathVariable("shoppingCart-id") long shoppingCartId,
                                    @LoginUserId Long userId            ) {
        //Order orderForService = mapper.orderRequestToOrder(request);
        OrderItem orderForResponse = orderItemService.createOrder(userId, shoppingCartId);
        OrderItemDto.Response response= mapper.orderToOrderResponse(orderForResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }*/
/*
    // TODO PATCH
    @PatchMapping("/{order-id}")
    public ResponseEntity patchOrder(@Valid @PathVariable("order-id") @Positive long orderId,
                                     @LoginUserId Long userId,
                                     @RequestBody OrderDto.Request request) {
        Order orderForService = mapper.orderRequestToOrder(request);
        orderForService.addOrderId(orderId);
        Order orderForResponse = orderService.updateOrder(userId, orderForService);
        OrderDto.Response response = mapper.orderToOrderResponse(orderForResponse);

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
    public ResponseEntity getOrder(@Valid @Positive @PathVariable("order-id") long orderId,
                                   @LoginUserId Long userId) {
        Order findOrder = orderService.getOrder(userId, orderId);

        return new ResponseEntity(new SingleResponseDto<>(findOrder),HttpStatus.OK);
    }

    // TODO DELETE
    @DeleteMapping("/{order-id}")
    public ResponseEntity deleteOrder(@Valid @Positive @PathVariable("order-id") long orderId,
                                      @LoginUserId Long userId) {
        orderService.deleteOrder(userId, orderId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }*/
}

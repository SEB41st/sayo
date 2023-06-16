package project2.SAYO.domain.payment.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project2.SAYO.domain.payment.dto.*;
import project2.SAYO.domain.payment.mapper.PaymentMapper;
import project2.SAYO.domain.payment.service.PaymentService;
import project2.SAYO.global.Response.SingleResponseDto;
import project2.SAYO.global.loginresolver.LoginUserId;

@Slf4j
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/payments")
public class PaymentController {
    private final PaymentService paymentService;
    private final PaymentMapper mapper;

    @PostMapping
    public ResponseEntity requestPayments(@RequestBody PaymentReq request,
                                          @LoginUserId Long userId){
        PaymentRes response = paymentService.requestPayments(userId, request);
        return new ResponseEntity(new SingleResponseDto<>(mapper.paymentResToPayment(response)), HttpStatus.OK);
    }

    @PostMapping("/success")
    public ResponseEntity paymentSuccess( @RequestBody PaymentSuccessDto request) {
        log.info("amountTest = {}", request.getAmount());
        log.info("paymentKeyTest = {}", request.getPaymentKey());
        log.info("orderIdTest = {}", request.getOrderId());

        return new ResponseEntity<>(paymentService.paymentSuccess(request), HttpStatus.OK);
    }

    @PostMapping("/fail")
    public ResponseEntity paymentFail(@RequestBody PaymentFailDto request) {

        paymentService.paymentFail(request.getErrorMsg(), request.getOrderId());

        return new ResponseEntity<>(new SingleResponseDto<>(
                mapper.createPaymentFailDto(request.getErrorCode(), request.getErrorMsg(), request.getOrderId())), HttpStatus.OK);
    }

    @PostMapping("/cancel")
    public ResponseEntity cancelPayment(@LoginUserId Long userId,
                                        @RequestBody PaymentCancelDto request) {

        return new ResponseEntity<>(new SingleResponseDto<>(
                paymentService.cancelPayment(userId, request.getPaymentKey(), request.getCancelReason())), HttpStatus.OK);
    }
}



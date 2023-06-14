package project2.SAYO.domain.payment.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project2.SAYO.domain.payment.dto.*;
import project2.SAYO.domain.payment.entity.Payment;
import project2.SAYO.domain.payment.enums.PayType;
import project2.SAYO.domain.payment.mapper.PaymentMapper;
import project2.SAYO.domain.payment.service.PaymentService;
import project2.SAYO.global.Response.SingleResponseDto;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;
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
    public ResponseEntity requestPayments(@RequestBody PaymentReq request,/*@RequestParam PayType payType,
                                          @RequestParam String orderName,
                                          @RequestParam Long amount,*/
                                          @LoginUserId Long userId){
        PaymentRes response = paymentService.requestPayments(userId, request);
        //PaymentRes response = paymentService.requestPayments(userId, payType, amount, orderName);
        return new ResponseEntity(new SingleResponseDto<>(mapper.paymentResToPayment(response)), HttpStatus.OK);
    }

    @PostMapping("/success")
    public ResponseEntity paymentSuccess(/*@RequestParam String paymentKey,
                                         @RequestParam String orderId,
                                         @RequestParam Long amount*/ @RequestBody PaymentSuccessDto request) {
        log.info("amountTest = {}", request.getAmount());
        log.info("paymentKeyTest = {}", request.getPaymentKey());
        log.info("orderIdTest = {}", request.getOrderId());

        //return new ResponseEntity<>(paymentService.paymentSuccess(paymentKey, orderId, amount), HttpStatus.OK);
        return new ResponseEntity<>(paymentService.paymentSuccess(request), HttpStatus.OK);
    }

    @PostMapping("/fail")
    public ResponseEntity paymentFail(/*@RequestParam String code,
                                      @RequestParam String errorMsg,
                                      @RequestParam String orderId*/ @RequestBody PaymentFailDto request) {

        paymentService.paymentFail(request.getErrorMsg(), request.getOrderId());

        return new ResponseEntity<>(new SingleResponseDto<>(
                mapper.createPaymentFailDto(request.getErrorCode(), request.getErrorMsg(), request.getOrderId())), HttpStatus.OK);
    }

    @PostMapping("/cancel")
    public ResponseEntity cancelPayment(@LoginUserId Long userId,
                                        /*@RequestParam String paymentKey,
                                        @RequestParam String cancelReason*/ @RequestBody PaymentCancelDto request) {

        return new ResponseEntity<>(new SingleResponseDto<>(
                paymentService.cancelPayment(userId, request.getPaymentKey(), request.getCancelReason())), HttpStatus.OK);
    }
}

    /*@GetMapping
    public ResponseEntity requestFinalPayments(@RequestBody PaymentDto.getRes request){
        try{
            System.out.println("paymentKey = " + request.getPaymentKey());
            System.out.println("orderId = " + request.getOrderId());
            System.out.println("amount = " + request.getAmount());

            paymentService.verifyRequest(request.getPaymentKey(), request.getOrderId(), request.getAmount());
            String result = paymentService.requestFinalPayments(request.getPaymentKey(), request.getOrderId(), request.getAmount());

            return result;
        }catch (Exception e){
            e.printStackTrace();
            throw new BusinessLogicException(ExceptionCode.PAYMENT_FAILED);
        }
    }

    @GetMapping
    public ResponseEntity requestFail(@RequestBody PaymentDto.failRes request){
        try{
            return paymentService.requestFail(request.getErrorCode(), request.getErrorMsg(), request.getOrderId());
        } catch (Exception e){
            e.printStackTrace();
            throw new BusinessLogicException(ExceptionCode.PAYMENT_FAILED);
        }
    }*/


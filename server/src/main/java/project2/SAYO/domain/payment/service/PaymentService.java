package project2.SAYO.domain.payment.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import project2.SAYO.domain.payment.dto.PaymentReq;
import project2.SAYO.domain.payment.dto.PaymentRes;
import project2.SAYO.domain.payment.dto.PaymentSuccessDto;
import project2.SAYO.domain.payment.entity.Payment;
import project2.SAYO.domain.payment.enums.PayType;
import project2.SAYO.domain.payment.repository.PaymentRepository;
import project2.SAYO.domain.user.entity.User;
import project2.SAYO.domain.user.service.UserService;
import project2.SAYO.global.exception.BusinessLogicException;
import project2.SAYO.global.exception.ExceptionCode;


import javax.transaction.Transactional;
import java.util.*;

import static project2.SAYO.domain.payment.enums.PaymentStatus.*;


@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final UserService userService;

    @Value("${payments.toss.test_secret_api_key}")
    private String testSecretApiKey;


    @Transactional
    public PaymentRes requestPayments(Long userId, PaymentReq request){
        User findUser = userService.findVerifiedUser(userId);
        Long amount = request.getAmount();

        if(amount == null){
            throw new BusinessLogicException(ExceptionCode.PAYMENT_ERROR_ORDER_PRICE);
        }

        Payment payment = request.toEntity();
        payment.setUser(findUser);

        if(findUser.getAddressList().size() >= 1){
            payment.setUserName(findUser.getAddressList().get(4).toString());
        }else{
            payment.setUserName(findUser.getProfile().getNickname());
        }

        payment.setCancel(false);
        payment.setPaymentStatus(READY);

        return paymentRepository.save(payment).toDto();
    }

    private void verifyPayType(PayType paymentType) {

        for (PayType type : PayType.values()) {
            if (type.getType().equals(paymentType.getType())) {
                return;
            }
        }

        log.debug("BusinessLogicException in verifyPaymentType() : paymentType={}", paymentType.getType());
        throw new BusinessLogicException(ExceptionCode.PAYTYPE_NOT_EQUALS);

    }

    @Transactional
    public PaymentSuccessDto paymentSuccess(PaymentSuccessDto request) {
        String orderId = request.getOrderId();
        long amount = request.getAmount();
        String paymentKey = request.getPaymentKey();
        log.info("amountTest1 = {}", request.getAmount());
        log.info("paymentKeyTest1 = {}", request.getPaymentKey());
        log.info("orderIdTest1 = {}", request.getOrderId());

        Payment payment = verifyPayment(orderId, amount);
        PaymentSuccessDto result = requestPaymentAccept(paymentKey, orderId, amount);
        payment.setPaymentKey(paymentKey);
        payment.setPaymentStatus(PAID);
        paymentRepository.save(payment);

        return result;
    }

    @Transactional
    public PaymentSuccessDto requestPaymentAccept(String paymentKey, String orderId, Long amount) {
        log.info("amountTest2 = {}",amount);
        log.info("paymentKeyTest2 = {}", paymentKey);
        log.info("orderIdTest2 = {}", orderId);
        PaymentSuccessDto paymentSuccessDto = null;

        try {
            paymentSuccessDto = paymentSuccessAccept(paymentKey, orderId, amount);

        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.PAYMENT_AUTHORIZATION_FAILED);
        }

        return paymentSuccessDto;
    }

    private PaymentSuccessDto paymentSuccessAccept(String paymentKey, String orderId, Long amount) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = getHeadersForPaymentService();
        JSONObject params = new JSONObject();
        params.put("paymentKey", paymentKey);
        params.put("orderId", orderId);
        params.put("amount", amount);

        PaymentSuccessDto response = null;
        try {
            response = restTemplate.postForObject(
                    "https://api.tosspayments.com/v1/payments/confirm", new HttpEntity<>(params, headers), PaymentSuccessDto.class);
        } catch (Exception e){
            e.printStackTrace();
        }
        return response;
    }

    @Transactional
    public void paymentFail(String errorMsg, String orderId) {
        Payment findPayment = paymentRepository.findByOrderId(orderId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.PAYMENT_NOT_FOUND));

        findPayment.setPaymentStatus(FAILED);
        findPayment.setFailDescription(errorMsg);
        paymentRepository.save(findPayment);

    }

    @Transactional
    public Map cancelPayment(Long memberId, String paymentKey, String cancelReason) {
        User verifiedUser = userService.findVerifiedUser(memberId);
        log.info("paymentKey = {}", paymentKey);
        Payment verifiedPayment = verifyPaymentByUserIdAndPaymentKey(paymentKey, verifiedUser);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        HttpHeaders headers = getHeadersForPaymentService();
        JSONObject params = new JSONObject();
        params.put("cancelReason", cancelReason);

        Map result = restTemplate.postForObject("https://api.tosspayments.com/v1/payments/" + paymentKey + "/cancel", new HttpEntity<>(params, headers), Map.class);
        verifiedPayment.setPaymentStatus(CANCELLED);
        paymentRepository.save(verifiedPayment);
        log.info("cancelResult = {}", result);
        return result;
    }

    public Payment verifyPayment(String orderId, Long amount) {
        Payment verifiedPayment = paymentRepository.findByOrderId(orderId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.PAYMENT_NOT_FOUND));

        if (!Objects.equals(verifiedPayment.getAmount(), amount)) {
            throw new BusinessLogicException(ExceptionCode.AMOUNT_NOT_EQUAL);
        }

        return verifiedPayment;
    }

    @Transactional
    public HttpHeaders getHeadersForPaymentService() {
        HttpHeaders headers = new HttpHeaders();
        String encodedAuth = Base64.getEncoder().encodeToString((testSecretApiKey + ":").getBytes());
        headers.setBasicAuth(encodedAuth);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        return headers;
    }

    private Payment verifyPaymentByUserIdAndPaymentKey(String paymentKey, User user) {
        return paymentRepository.findByPaymentKeyAndUserId(paymentKey, user.getId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PAYMENT_NOT_FOUND));
    }

}

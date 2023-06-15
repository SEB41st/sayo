package project2.SAYO.domain.payment.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
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

    @Value("${payments.toss.test_client_api_key}")
    private String testClientApiKey;

    @Value("${payments.toss.test_secret_api_key}")
    private String testSecretApiKey;


    @Transactional
    public PaymentRes requestPayments(Long userId, PaymentReq request){
        User finduser = userService.findVerifiedUser(userId);
        Long amount = request.getAmount();

        if(amount == null){
            throw new BusinessLogicException(ExceptionCode.PAYMENT_ERROR_ORDER_PRICE);
        }

        Payment payment = request.toEntity();
        payment.setUser(finduser);
        payment.setCancel(false);
        payment.setPaymentStatus(READY);

        return paymentRepository.save(payment).toDto();
    }

    /*public PaymentRes requestPayments(Long userId, PayType payType, Long amount, String orderName){
        User finduser = userService.findVerifiedUser(userId);
        verifyPayType(payType);

        if(amount == null || amount < 3000){
            throw new BusinessLogicException(ExceptionCode.PAYMENT_ERROR_ORDER_PRICE);
        }
        String userName = String.valueOf(finduser.getAddressList().get(2));

        Payment payment = Payment.builder()
                .payType(PayType.CARD)
                .orderId(UUID.randomUUID().toString())
                .amount(amount)
                .orderName(orderName)
                .userName(userName)
                .paymentStatus(READY)
                .build();
        payment.setUser(finduser);
        payment.setCancel(false);

        return paymentRepository.save(payment).toDto();
    }*/

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
    public PaymentSuccessDto paymentSuccess(/*String paymentKey, String orderId, Long amount*/PaymentSuccessDto request) {
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
//        PagelessMultiResponseDto response = new PagelessMultiResponseDto<>();
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
        /*PaymentSuccessDto  response = restTemplate.postForObject(
                    "https://api.tosspayments.com/v1/payments/confirm", new HttpEntity<>(params, headers), PaymentSuccessDto.class);
*/
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
        HttpHeaders headers = getHeadersForPaymentService();
        JSONObject params = new JSONObject();
        params.put("cancelReason", cancelReason);
        Map result = restTemplate.postForObject("https://api.tosspayments.com/v1/payments" + paymentKey + "/cancel", new HttpEntity<>(params, headers), Map.class);
        verifiedPayment.setPaymentStatus(CANCELLED);
        paymentRepository.save(verifiedPayment);

        return result;
    }



    /*@Transactional
    public void verifyRequest(String paymentKey, String orderId, int amount){
        paymentRepository.findByOrderId(orderId)
                .ifPresentOrElse( P -> {
                    if(P.getAmount().equals(amount)){
                        P.setPaymentKey(paymentKey);
                    }else{
                        throw new BusinessLogicException(ExceptionCode.PAYMENT_FAILED);
                    }
                }, () -> {throw new BusinessLogicException(ExceptionCode.PAYMENT_FAILED);
                }
                );
    }*/

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


    /*@Transactional
    public String requestFinalPayments(String paymentKey, String orderId, int amount){

        Payment pay = paymentRepository.findByPaymentKey(paymentKey)
                .orElseThrow(() -> new BussinessException(ExMessage.PAYMENT_ERROR_ORDER_NOTFOUND));
        PAY_TYPE payType = pay.getPayType();
        Long reservationSeq = pay.getReservationSeq();
        Reservation reservation = reservationRepo.findById(reservationSeq)
                .orElseThrow(() -> new BussinessException(ExMessage.RESERVATION_ERROR_NOT_FOUND));

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        testSecretApiKey = testSecretApiKey + ":";
        String encodedAuth = new String(Base64.getEncoder().encode((testSecretApiKey + ":").getBytes(StandardCharsets.UTF_8)));

        headers.setBasicAuth(encodedAuth);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        JSONObject params = new JSONObject();
        params.put("orderId", orderId);
        params.put("amount", amount + "");

        return restTemplate.postForEntity(tossOriginUrl + "/payments/" + paymentKey,
                new HttpEntity<>(params,headers),
                String.class).getBody();
    }*/

    /*@Transactional
    public PaymentDto.PaymentResHandleFailDto requestFail(String errorCdoe, String errorMsg, String orderId){
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PAYMENT_FAILED));

        payment.setPaySuccessYn("N");
        log.info("errorMsg = {}", errorMsg);

        return PaymentDto.PaymentResHandleFailDto.builder()
                .orderId(orderId)
                .errorCode(errorCdoe)
                .errorMsg(errorMsg)
                .build();
    }*/


}

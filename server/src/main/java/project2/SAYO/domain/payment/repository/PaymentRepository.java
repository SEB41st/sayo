package project2.SAYO.domain.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project2.SAYO.domain.payment.entity.Payment;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByOrderCode(String orderCode);
    Optional<Payment> findByPaymentKeyAndUserId(String paymentKey, Long userId);}

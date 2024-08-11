// PaymentRepository.java
package com.example.hall_booking.repository;

import com.example.hall_booking.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}

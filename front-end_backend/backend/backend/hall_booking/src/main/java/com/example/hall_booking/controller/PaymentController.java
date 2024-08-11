// PaymentController.java
package com.example.hall_booking.controller;

import com.example.hall_booking.model.Payment;
import com.example.hall_booking.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        Optional<Payment> payment = paymentService.findById(id);
        if (payment.isPresent()) {
            return ResponseEntity.ok(payment.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) {
        return paymentService.save(payment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment paymentDetails) {
        Optional<Payment> payment = paymentService.findById(id);
        if (payment.isPresent()) {
            Payment existingPayment = payment.get();
            existingPayment.setBooking(paymentDetails.getBooking());
            existingPayment.setPaymentDate(paymentDetails.getPaymentDate());
            existingPayment.setAmount(paymentDetails.getAmount());
            existingPayment.setPaymentMethod(paymentDetails.getPaymentMethod());
            existingPayment.setTransactionId(paymentDetails.getTransactionId());
            Payment updatedPayment = paymentService.save(existingPayment);
            return ResponseEntity.ok(updatedPayment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        Optional<Payment> payment = paymentService.findById(id);
        if (payment.isPresent()) {
            paymentService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

// BookingController.java
package com.example.hall_booking.controller;

import com.example.hall_booking.model.Booking;
import com.example.hall_booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Optional<Booking> booking = bookingService.findById(id);
        if (booking.isPresent()) {
            return ResponseEntity.ok(booking.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.save(booking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking bookingDetails) {
        Optional<Booking> booking = bookingService.findById(id);
        if (booking.isPresent()) {
            Booking existingBooking = booking.get();
            existingBooking.setUser(bookingDetails.getUser());
            existingBooking.setHall(bookingDetails.getHall());
            existingBooking.setBookingDate(bookingDetails.getBookingDate());
            existingBooking.setStartTime(bookingDetails.getStartTime());
            existingBooking.setEndTime(bookingDetails.getEndTime());
            existingBooking.setTotalPrice(bookingDetails.getTotalPrice());
            existingBooking.setStatus(bookingDetails.getStatus());
            Booking updatedBooking = bookingService.save(existingBooking);
            return ResponseEntity.ok(updatedBooking);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        Optional<Booking> booking = bookingService.findById(id);
        if (booking.isPresent()) {
            bookingService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

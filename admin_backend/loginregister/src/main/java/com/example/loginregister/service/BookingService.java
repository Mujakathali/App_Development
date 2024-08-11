package com.example.loginregister.service;

import com.example.loginregister.model.Booking;
import com.example.loginregister.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    // Method to retrieve all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Method to create a new booking
    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }
}

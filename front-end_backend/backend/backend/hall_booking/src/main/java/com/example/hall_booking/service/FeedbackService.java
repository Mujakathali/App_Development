// FeedbackService.java
package com.example.hall_booking.service;

import com.example.hall_booking.model.Feedback;
import com.example.hall_booking.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<Feedback> findAll() {
        return feedbackRepository.findAll();
    }

    public Optional<Feedback> findById(Long id) {
        return feedbackRepository.findById(id);
    }

    public Feedback save(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public void deleteById(Long id) {
        feedbackRepository.deleteById(id);
    }
}

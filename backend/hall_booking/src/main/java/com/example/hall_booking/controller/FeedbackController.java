package com.example.hall_booking.controller;

import com.example.hall_booking.model.Feedback;
import com.example.hall_booking.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping
    public List<Feedback> getAllFeedbacks() {
        return feedbackService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
        Optional<Feedback> feedback = feedbackService.findById(id);
        if (feedback.isPresent()) {
            return ResponseEntity.ok(feedback.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Feedback createFeedback(@RequestBody Feedback feedback) {
        return feedbackService.save(feedback);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable Long id, @RequestBody Feedback feedbackDetails) {
        Optional<Feedback> feedback = feedbackService.findById(id);
        if (feedback.isPresent()) {
            Feedback existingFeedback = feedback.get();
            existingFeedback.setUser(feedbackDetails.getUser());
            existingFeedback.setHall(feedbackDetails.getHall());
            existingFeedback.setRating(feedbackDetails.getRating());
            existingFeedback.setComments(feedbackDetails.getComments());
            Feedback updatedFeedback = feedbackService.save(existingFeedback);
            return ResponseEntity.ok(updatedFeedback);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        Optional<Feedback> feedback = feedbackService.findById(id);
        if (feedback.isPresent()) {
            feedbackService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

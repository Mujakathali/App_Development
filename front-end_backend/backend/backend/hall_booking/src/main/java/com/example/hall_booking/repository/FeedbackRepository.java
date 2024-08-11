// FeedbackRepository.java
package com.example.hall_booking.repository;

import com.example.hall_booking.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}

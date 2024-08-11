package com.example.hall_booking.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hall_booking.model.User1;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User1, Long> {
    Optional<User1> findByEmail(String email);
}

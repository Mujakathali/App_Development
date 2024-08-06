// HallService.java
package com.example.hall_booking.service;

import com.example.hall_booking.model.Hall;
import com.example.hall_booking.repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HallService {

    @Autowired
    private HallRepository hallRepository;

    public List<Hall> findAll() {
        return hallRepository.findAll();
    }

    public Optional<Hall> findById(Long id) {
        return hallRepository.findById(id);
    }

    public Hall save(Hall hall) {
        return hallRepository.save(hall);
    }

    public void deleteById(Long id) {
        hallRepository.deleteById(id);
    }
}

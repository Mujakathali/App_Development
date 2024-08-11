// HallService.java
package com.example.hall_booking.service;

import com.example.hall_booking.model.Hall;
import com.example.hall_booking.repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HallService {

    @Autowired
    private HallRepository hallRepository;

    public List<Hall> getAllHalls() {
        return hallRepository.findAll();
    }

    public Hall addHall(Hall hall) {
        return hallRepository.save(hall);
    }

    public void deleteHall(Long id) {
        hallRepository.deleteById(id);
    }
}

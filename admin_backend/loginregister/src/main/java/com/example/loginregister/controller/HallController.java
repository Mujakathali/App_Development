package com.example.loginregister.controller;

import com.example.loginregister.model.Hall;
import com.example.loginregister.repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/halls")
public class HallController {

    @Autowired
    private HallRepository hallRepository;

    @GetMapping
    public ResponseEntity<Iterable<Hall>> getAllHalls() {
        return ResponseEntity.ok(hallRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Hall> addHall(@RequestBody Hall hall) {
        return ResponseEntity.ok(hallRepository.save(hall));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hall> updateHall(@PathVariable Long id, @RequestBody Hall hallDetails) {
        Optional<Hall> optionalHall = hallRepository.findById(id);
        if (!optionalHall.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Hall hall = optionalHall.get();
        hall.setHall(hallDetails.getHall());
        hall.setCapacity(hallDetails.getCapacity());
        hall.setPrice(hallDetails.getPrice());
        hall.setAvailability(hallDetails.getAvailability());
        hall.setImage(hallDetails.getImage());

        Hall updatedHall = hallRepository.save(hall);
        return ResponseEntity.ok(updatedHall);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHall(@PathVariable Long id) {
        if (!hallRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        hallRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

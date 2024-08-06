// HallController.java
package com.example.hall_booking.controller;

import com.example.hall_booking.model.Hall;
import com.example.hall_booking.service.HallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/halls")
public class HallController {

    @Autowired
    private HallService hallService;

    @GetMapping
    public List<Hall> getAllHalls() {
        return hallService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hall> getHallById(@PathVariable Long id) {
        Optional<Hall> hall = hallService.findById(id);
        if (hall.isPresent()) {
            return ResponseEntity.ok(hall.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Hall createHall(@RequestBody Hall hall) {
        return hallService.save(hall);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hall> updateHall(@PathVariable Long id, @RequestBody Hall hallDetails) {
        Optional<Hall> hall = hallService.findById(id);
        if (hall.isPresent()) {
            Hall existingHall = hall.get();
            existingHall.setHallName(hallDetails.getHallName());
            existingHall.setLocation(hallDetails.getLocation());
            existingHall.setCapacity(hallDetails.getCapacity());
            existingHall.setFacilities(hallDetails.getFacilities());
            existingHall.setPricePerHour(hallDetails.getPricePerHour());
            existingHall.setDescription(hallDetails.getDescription());
            Hall updatedHall = hallService.save(existingHall);
            return ResponseEntity.ok(updatedHall);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHall(@PathVariable Long id) {
        Optional<Hall> hall = hallService.findById(id);
        if (hall.isPresent()) {
            hallService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}



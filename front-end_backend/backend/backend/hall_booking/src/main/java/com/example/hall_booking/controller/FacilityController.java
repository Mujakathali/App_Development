// FacilityController.java
package com.example.hall_booking.controller;

import com.example.hall_booking.model.Facility;
import com.example.hall_booking.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/facilities")
public class FacilityController {

    @Autowired
    private FacilityService facilityService;

    @GetMapping
    public List<Facility> getAllFacilities() {
        return facilityService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Facility> getFacilityById(@PathVariable Long id) {
        Optional<Facility> facility = facilityService.findById(id);
        if (facility.isPresent()) {
            return ResponseEntity.ok(facility.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Facility createFacility(@RequestBody Facility facility) {
        return facilityService.save(facility);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Facility> updateFacility(@PathVariable Long id, @RequestBody Facility facilityDetails) {
        Optional<Facility> facility = facilityService.findById(id);
        if (facility.isPresent()) {
            Facility existingFacility = facility.get();
            existingFacility.setFacilityName(facilityDetails.getFacilityName());
            existingFacility.setDescription(facilityDetails.getDescription());
            Facility updatedFacility = facilityService.save(existingFacility);
            return ResponseEntity.ok(updatedFacility);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFacility(@PathVariable Long id) {
        Optional<Facility> facility = facilityService.findById(id);
        if (facility.isPresent()) {
            facilityService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

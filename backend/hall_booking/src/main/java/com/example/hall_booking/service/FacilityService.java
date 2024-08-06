package com.example.hall_booking.service;

import com.example.hall_booking.model.Facility;
import com.example.hall_booking.repository.FacilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacilityService {

    @Autowired
    private FacilityRepository facilityRepository;

    public List<Facility> findAll() {
        return facilityRepository.findAll();
    }

    public Optional<Facility> findById(Long id) {
        return facilityRepository.findById(id);
    }

    public Facility save(Facility facility) {
        return facilityRepository.save(facility);
    }

    public void deleteById(Long id) {
        facilityRepository.deleteById(id);
    }
}

// FacilityRepository.java
package com.example.hall_booking.repository;

import com.example.hall_booking.model.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Long> {
}

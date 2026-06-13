package com.safeseat.repository;

import com.safeseat.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    // Custom query methods for seat availability
    List<Seat> findByIsAvailable(boolean available);
    List<Seat> findByRowAndIsAvailable(int row, boolean available);
    List<Seat> findBySectionAndIsAvailable(String section, boolean available);
    List<Seat> findBySectionAndSeatTypeAndIsAvailable(String section, String seatType, boolean available);

    // Method to find a specific seat by row and column (assuming seatNumber is unique but we can use row+column)
    Seat findByRowAndColumn(int row, char column);

    // Additional methods for adjacent seat logic can be added here or in service layer
}
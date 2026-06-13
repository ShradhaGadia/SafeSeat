package com.safeseat.repository;

import com.safeseat.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Custom query methods for bookings
    List<Booking> findByUserId(Long userId);
    List<Booking> findBySeatId(Long seatId);
    List<Booking> findByBookingTimeBetween(LocalDateTime start, LocalDateTime end);
    List<Booking> findByStatus(com.safeseat.entity.Booking.Status status);
    // Optional: find active bookings for a seat to check conflicts
}
package com.safeseat.controller;

import com.safeseat.entity.Booking;
import com.safeseat.entity.User;
import com.safeseat.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private com.safeseat.repository.UserRepository userRepository;

    /**
     * Create a new booking for a user.
     *
     * @param userId the ID of the user
     * @param preferredSection preferred section (e.g., "Sleeper", "AC") - optional
     * @param passengerCount number of passengers (currently only 1 supported)
     * @return the created booking
     */
    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestParam Long userId,
            @RequestParam(required = false) String preferredSection,
            @RequestParam int passengerCount) {
        Booking booking = bookingService.bookSeat(userId, preferredSection, passengerCount);
        return ResponseEntity.ok(booking);
    }

    /**
     * Get booking details by ID.
     *
     * @param bookingId the ID of the booking
     * @return the booking
     */
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBooking(@PathVariable Long id) {
        Booking booking = bookingService.getBooking(id);
        return ResponseEntity.ok(booking);
    }

    /**
     * Cancel a booking by ID.
     *
     * @param bookingId the ID of the booking to cancel
     * @return success message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.ok("Booking cancelled successfully");
    }

    /**
     * Get all bookings for a user.
     *
     * @param userId the ID of the user
     * @return list of bookings
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.findByUserId(userId);
        return ResponseEntity.ok(bookings);
    }
}
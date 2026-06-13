package com.safeseat.service;

import com.safeseat.entity.Booking;
import com.safeseat.entity.Seat;
import com.safeseat.entity.User;
import com.safeseat.entity.Booking.Status;
import com.safeseat.repository.BookingRepository;
import com.safeseat.repository.SeatRepository;
import com.safeseat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class BookingService {

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SeatAllocationService seatAllocationService;

    /**
     * Book a seat for a user.
     * This method handles the booking process including seat allocation,
     * availability check, and saving the booking in a transaction.
     *
     * @param userId the ID of the user making the booking
     * @param preferredSection preferred section (e.g., "Sleeper", "AC") - can be null
     * @param passengerCount number of passengers (for simplicity, we handle 1 passenger here)
     * @return the created booking
     * @throws RuntimeException if no seat is available or user not found
     */
    @Transactional
    public Booking bookSeat(Long userId, String preferredSection, int passengerCount) {
        // For simplicity, we only handle solo passenger (passengerCount == 1) for the adjacent seat logic.
        // In a more advanced system, we could allocate multiple adjacent seats for groups.
        if (passengerCount != 1) {
            // For now, we throw an error for non-solo passengers; we can extend later.
            throw new IllegalArgumentException("Only solo passenger bookings are supported in this version.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Allocate a seat using our special algorithm for solo women travelers
        Seat allocatedSeat = seatAllocationService.allocateSeat(user, preferredSection);

        if (allocatedSeat == null) {
            throw new RuntimeException("No seat available for booking. Please try again later or choose different preferences.");
        }

        // Double-check seat availability within the transaction (optimistic locking will handle conflicts)
        if (!allocatedSeat.isAvailable()) {
            throw new RuntimeException("Seat became unavailable during booking process.");
        }

        // Mark seat as unavailable
        allocatedSeat.setAvailable(false);
        seatRepository.save(allocatedSeat); // This will trigger optimistic lock check

        // Create and save the booking
        Booking booking = new Booking(
                user,
                allocatedSeat,
                LocalDateTime.now(),
                Status.CONFIRMED,
                passengerCount
        );

        Booking savedBooking = bookingRepository.save(booking);
        return savedBooking;
    }

    /**
     * Cancel a booking by its ID.
     * This will make the seat available again.
     *
     * @param bookingId the ID of the booking to cancel
     * @return true if cancelled successfully, false if booking not found
     */
    @Transactional
    public boolean cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));

        if (booking.getStatus() != Status.CONFIRMED) {
            throw new RuntimeException("Only confirmed bookings can be cancelled.");
        }

        // Make the seat available again
        Seat seat = booking.getSeat();
        seat.setAvailable(true);
        seatRepository.save(seat);

        // Update booking status
        booking.setStatus(Status.CANCELLED);
        bookingRepository.save(booking);

        return true;
    }

    /**
     * Get booking details by ID.
     *
     * @param bookingId the ID of the booking
     * @return the booking
     */
    @Transactional(readOnly = true)
    public Booking getBooking(Long bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));
    }

    /**
     * Get all bookings for a user.
     *
     * @param userId the ID of the user
     * @return list of bookings
     */
    @Transactional(readOnly = true)
    public List<Booking> findByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }
}
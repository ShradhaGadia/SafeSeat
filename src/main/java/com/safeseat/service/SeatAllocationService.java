package com.safeseat.service;

import com.safeseat.entity.Seat;
import com.safeseat.entity.User;
import com.safeseat.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SeatAllocationService {

    @Autowired
    private SeatRepository seatRepository;

    /**
     * Find the best available seat for a user, considering special preferences for solo women travelers.
     *
     * @param user the user requesting a seat
     * @param preferredSection optional section preference (e.g., "Economy")
     * @return the allocated seat, or null if no seat available
     */
    @Transactional(readOnly = true)
    public Seat allocateSeat(User user, String preferredSection) {
        boolean isSoloFemale = "FEMALE".equalsIgnoreCase(user.getGender());
        // For simplicity, we assume solo means passengerCount = 1; we would need booking context.
        // In a real scenario, this service would be called from BookingService with passenger count.

        // If solo female, try to find a seat with at least one adjacent empty seat
        if (isSoloFemale) {
            Seat adjacentSeat = findSeatWithAdjacentAvailability(preferredSection);
            if (adjacentSeat != null) {
                return adjacentSeat;
            }
        }

        // Fallback to standard allocation: best available seat in preferred section or any section
        return findBestAvailableSeat(preferredSection);
    }

    /**
     * Find a seat that has at least one adjacent empty seat (same column, row +/- 1 for trains).
     * For solo women travelers, we prefer seats where the adjacent seat (front or back) is also empty.
     *
     * @param preferredSection optional section preference
     * @return a seat with adjacent availability, or null if none found
     */
    @Transactional(readOnly = true)
    public Seat findSeatWithAdjacentAvailability(String preferredSection) {
        List<Seat> availableSeats = (preferredSection != null && !preferredSection.isEmpty())
                ? seatRepository.findBySectionAndIsAvailable(preferredSection, true)
                : seatRepository.findByIsAvailable(true);

        // For train-like adjacency: check same column, row +/- 1 (front and back)
        for (Seat seat : availableSeats) {
            int row = seat.getRow();
            char col = seat.getColumn();

            // Check front seat (row + 1, same column)
            Seat frontSeat = seatRepository.findByRowAndColumn(row + 1, col);
            boolean frontAvailable = frontSeat != null && frontSeat.isAvailable();

            // Check back seat (row - 1, same column)
            Seat backSeat = seatRepository.findByRowAndColumn(row - 1, col);
            boolean backAvailable = backSeat != null && backSeat.isAvailable();

            // If either front or back adjacent seat is available, this seat is good for solo woman
            if (frontAvailable || backAvailable) {
                return seat;
            }
        }
        return null;
    }

    /**
     * Find the best available seat based on some criteria (e.g., front of section, window/aisle preference).
     * For now, just return the first available seat in the preferred section or any section.
     *
     * @param preferredSection optional section preference
     * @return an available seat, or null if none
     */
    @Transactional(readOnly = true)
    public Seat findBestAvailableSeat(String preferredSection) {
        List<Seat> availableSeats = (preferredSection != null && !preferredSection.isEmpty())
                ? seatRepository.findBySectionAndIsAvailable(preferredSection, true)
                : seatRepository.findByIsAvailable(true);
        return availableSeats.isEmpty() ? null : availableSeats.get(0);
    }

    // Helper method to find seat by row and column (we need to add this to repository)
    // We'll add a custom method in SeatRepository later.
}
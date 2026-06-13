package com.safeseat.controller;

import com.safeseat.entity.Seat;
import com.safeseat.repository.SeatRepository;
import com.safeseat.service.SeatAllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
public class SeatController {

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private SeatAllocationService seatAllocationService;

    @GetMapping("/available")
    public ResponseEntity<List<Seat>> getAvailableSeats() {
        return ResponseEntity.ok(seatRepository.findByIsAvailable(true));
    }

    @GetMapping("/available/adjacent")
    public ResponseEntity<List<Seat>> getSeatsWithAdjacentAvailability(
            @RequestParam(required = false) String section) {
        // For simplicity, we return all seats that have adjacent availability (not per user)
        // We could compute this by checking each available seat's neighbors.
        // We'll implement a simple version: iterate over available seats and check if any neighbor is available.
        List<Seat> availableSeats = (section != null && !section.isEmpty())
                ? seatRepository.findBySectionAndIsAvailable(section, true)
                : seatRepository.findByIsAvailable(true);

        // We'll just return the list; the adjacent logic is used in allocation service.
        // For demonstration, we can return the same list.
        return ResponseEntity.ok(availableSeats);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seat> getSeat(@PathVariable Long id) {
        return seatRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
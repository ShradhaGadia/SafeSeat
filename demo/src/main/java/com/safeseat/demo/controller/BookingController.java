package com.safeseat.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.safeseat.demo.entity.Booking;
import com.safeseat.demo.entity.User;
import com.safeseat.demo.repository.BookingRepository;
import com.safeseat.demo.repository.UserRepository;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public Booking createBooking(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setPassengerName(payload.get("passengerName").toString());
        booking.setPassengerAge(Integer.parseInt(payload.get("passengerAge").toString()));
        booking.setPassengerGender(payload.get("passengerGender").toString());

        return bookingRepository.save(booking);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBooking(@PathVariable Long id) {
        return bookingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

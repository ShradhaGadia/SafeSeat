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
import com.safeseat.demo.entity.Seat;
import com.safeseat.demo.entity.Ticket;
import com.safeseat.demo.repository.BookingRepository;
import com.safeseat.demo.repository.SeatRepository;
import com.safeseat.demo.repository.TicketRepository;


@RestController
@RequestMapping("/tickets")
public class TicketController {
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private SeatRepository seatRepository;

    @PostMapping
    public Ticket createTicket(@RequestBody Map<String, Object> payload) {
        Long bookingId = Long.valueOf(payload.get("bookingId").toString());
        Long seatId = Long.valueOf(payload.get("seatId").toString());
    
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
        Seat seat = seatRepository.findById(seatId).orElseThrow(() -> new RuntimeException("Seat not found"));
    
        Ticket ticket = new Ticket();
        ticket.setBooking(booking);
        ticket.setSeat(seat);
        ticket.setPnr(payload.get("pnr").toString());
    
        return ticketRepository.save(ticket);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) {
        return ticketRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

package com.safeseat.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
public class Booking {

    public enum Status {
        CONFIRMED, CANCELLED, EXPIRED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Seat seat;

    private LocalDateTime bookingTime;
    private Status status;
    private int passengerCount;

    // Constructors
    public Booking() {}

    public Booking(User user, Seat seat, LocalDateTime bookingTime, Status status, int passengerCount) {
        this.user = user;
        this.seat = seat;
        this.bookingTime = bookingTime;
        this.status = status;
        this.passengerCount = passengerCount;
    }
}
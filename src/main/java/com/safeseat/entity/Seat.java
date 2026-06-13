package com.safeseat.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Version;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String seatNumber; // e.g., "12A"
    private int row;
    private char column; // e.g., 'A', 'B', 'C'
    private boolean isAvailable = true;

    @Version
    private Long version;

    // Additional fields for seat allocation algorithm
    private String section; // e.g., "Economy", "Business", "First"
    private String seatType; // e.g., "AISLE", "WINDOW", "MIDDLE"
}

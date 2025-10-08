package com.safeseat.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seatId;

    private String seatNumber;
    private boolean isReservedForFemale;

    @ManyToOne
    @JoinColumn(name = "coach_id")
    private Coach coach;

    @OneToOne
    @JoinColumn(name = "nearby_seat_id")
    @JsonIgnore
    private Seat nearbySeat;
}

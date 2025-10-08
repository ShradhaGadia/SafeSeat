package com.safeseat.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Train {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainId;

    private String trainName;
    private String source;
    private String destination;
    private String departureTime;
    private String arrivalTime;
}

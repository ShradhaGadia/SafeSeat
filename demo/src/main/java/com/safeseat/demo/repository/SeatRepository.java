package com.safeseat.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.safeseat.demo.entity.Seat;

public interface SeatRepository extends JpaRepository<Seat,Long>{

}

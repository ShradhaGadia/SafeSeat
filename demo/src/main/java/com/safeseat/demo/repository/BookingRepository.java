package com.safeseat.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.safeseat.demo.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking,Long> {

}

package com.safeseat.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safeseat.demo.entity.Ticket;


public interface TicketRepository extends JpaRepository<Ticket,Long>{

}

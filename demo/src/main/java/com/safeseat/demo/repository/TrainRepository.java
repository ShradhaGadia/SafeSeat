package com.safeseat.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safeseat.demo.entity.Train;

public interface TrainRepository extends JpaRepository<Train,Long>{

}

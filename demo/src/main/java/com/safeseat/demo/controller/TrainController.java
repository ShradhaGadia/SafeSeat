package com.safeseat.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.safeseat.demo.entity.Train;
import com.safeseat.demo.repository.TrainRepository;
@RestController
@RequestMapping("/trains")
public class TrainController {

    @Autowired
    private TrainRepository trainRepository;

    @GetMapping("/{id}")
    public ResponseEntity<Train> getTrainById(@PathVariable Long id) {
        return trainRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
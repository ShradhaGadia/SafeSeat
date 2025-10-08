package com.safeseat.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safeseat.demo.entity.User;


public interface UserRepository extends JpaRepository<User,Long>{

}

package com.safeseat.repository;

import com.safeseat.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Optional: add custom query methods if needed
    // Example: User findByEmail(String email);
}
package com.vinh.cosmetic_web.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vinh.cosmetic_web.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    List<User> findByUsernameContainingIgnoreCase(String username);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
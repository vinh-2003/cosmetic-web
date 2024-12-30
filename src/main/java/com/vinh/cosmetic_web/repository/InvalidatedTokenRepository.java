package com.vinh.cosmetic_web.repository;

import com.vinh.cosmetic_web.entity.InvalidatedToken;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedToken, String> {
}

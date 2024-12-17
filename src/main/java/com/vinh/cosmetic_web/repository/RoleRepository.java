package com.vinh.cosmetic_web.repository;

import com.vinh.cosmetic_web.entity.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {}
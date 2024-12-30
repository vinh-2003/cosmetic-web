package com.vinh.cosmetic_web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vinh.cosmetic_web.entity.Permission;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {}
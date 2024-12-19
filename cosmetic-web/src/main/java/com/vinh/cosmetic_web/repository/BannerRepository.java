package com.vinh.cosmetic_web.repository;

import com.vinh.cosmetic_web.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BannerRepository extends JpaRepository<Banner, String> {
}

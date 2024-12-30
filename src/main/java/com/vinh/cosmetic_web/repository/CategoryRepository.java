package com.vinh.cosmetic_web.repository;

import com.vinh.cosmetic_web.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    List<Category> findByEnabled(boolean enabled);
    List<Category> findByNameContainingIgnoreCaseAndEnabled(String name, boolean enabled);
}

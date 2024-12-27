package com.vinh.cosmetic_web.repository;

import com.vinh.cosmetic_web.entity.Category;
import com.vinh.cosmetic_web.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findByEnabled(boolean enabled);
    List<Product> findByNameContainingIgnoreCaseAndEnabled(String name, boolean enabled);
    List<Product> findByCategoryAndEnabled(Category category, boolean enabled);
}

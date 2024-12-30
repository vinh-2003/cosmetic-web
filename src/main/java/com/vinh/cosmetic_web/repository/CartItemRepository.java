package com.vinh.cosmetic_web.repository;

import com.vinh.cosmetic_web.entity.Cart;
import com.vinh.cosmetic_web.entity.CartItem;
import com.vinh.cosmetic_web.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, String> {
    CartItem findByCartAndProduct(Cart cart, Product product);
    List<CartItem> findByProduct(Product product);
}

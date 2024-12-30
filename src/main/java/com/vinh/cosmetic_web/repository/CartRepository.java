package com.vinh.cosmetic_web.repository;

import com.vinh.cosmetic_web.entity.Cart;
import com.vinh.cosmetic_web.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {
    Cart findByUser(User user);
}

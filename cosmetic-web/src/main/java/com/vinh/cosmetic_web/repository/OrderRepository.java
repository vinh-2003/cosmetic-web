package com.vinh.cosmetic_web.repository;

import com.vinh.cosmetic_web.entity.Order;
import com.vinh.cosmetic_web.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByUserOrderByCreatedAtDesc(User user);
    List<Order> findByUserAndOrderIdContainingIgnoreCaseOrderByCreatedAtDesc(User user, String orderId);
    List<Order> findByOrderByCreatedAtDesc();
    List<Order> findByOrderIdContainingIgnoreCaseOrderByCreatedAtDesc(String orderId);
}

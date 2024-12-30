package com.vinh.cosmetic_web.repository;

import com.vinh.cosmetic_web.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatus, String> {
}

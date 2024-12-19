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
//    @Query("SELECT Order() " +
//            "FROM Order o LEFT JOIN o.orderStatuses os " +
//            "WHERE o.user = :user " +
//            "AND os.status <> 'ĐANG TẠO' "+
//            "AND os.changedAt = (SELECT MAX(os2.changedAt) FROM OrderStatus os2 WHERE os2.order.orderId = o.orderId) " +
//            "ORDER BY o.createdAt desc")
//    List<Order> findOrdersWithLatestStatus(@Param("user") User user);
//
//    @Query("SELECT Order() " +
//            "FROM Order o LEFT JOIN o.orderStatuses os " +
//            "WHERE o.user = :user " +
//            "AND os.status = :status " +
//            "AND os.changedAt = (SELECT MAX(os2.changedAt) FROM OrderStatus os2 WHERE os2.order.orderId = o.orderId) " +
//            "ORDER BY o.createdAt desc")
//    List<Order> findOrdersWithStatus(@Param("user") User user, @Param("status") String status);
}

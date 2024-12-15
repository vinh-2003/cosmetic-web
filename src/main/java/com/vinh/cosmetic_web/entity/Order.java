package com.vinh.cosmetic_web.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "order_id")
    String orderId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @Column(name = "total", nullable = false)
    Long total = 0L;

    @OneToOne
    @JoinColumn(name = "current_status_id", nullable = false)
    OrderStatus currentStatus;

    @ManyToOne
    @JoinColumn(name = "shipping_address_id", nullable = false)
    ShippingAddress shippingAddress;

    @ManyToOne
    @JoinColumn(name = "voucher_id")
    Voucher voucher = null;

    @Column(name = "created_at")
    LocalDateTime createdAt;

    @OneToMany(mappedBy = "order")
    List<OrderItem> orderItems = new ArrayList<>();
}

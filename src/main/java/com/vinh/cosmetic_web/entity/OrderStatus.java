package com.vinh.cosmetic_web.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "order_status")
public class OrderStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "status_id")
    String statusId;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    Order order;

    @Column(name = "status", nullable = false)
    String status;

    @Column(name = "changed_at")
    @Builder.Default
    LocalDateTime changedAt = LocalDateTime.now();
}

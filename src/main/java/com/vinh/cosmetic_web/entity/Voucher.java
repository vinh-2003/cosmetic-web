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
@Table(name = "voucher")
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "voucher_id")
    String voucherId;

    @Column(name = "code", nullable = false, unique = true)
    String code;

    @Column(name = "discount", nullable = false)
    Integer discount;

    @Column(name = "start_date", nullable = false)
    LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    LocalDateTime endDate = LocalDateTime.now();

    @Column(name = "min_purchase")
    Long minPurchase = 0L;

    @Column(name = "usage_limit")
    Integer usageLimit = 1;

    @Column(name = "created_at")
    LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "enabled")
    Boolean enabled = true;
}

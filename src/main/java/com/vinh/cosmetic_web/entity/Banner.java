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
@Table(name = "banner")
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "banner_id")
    String bannerId;

    @Column(name = "image_url", nullable = false)
    String imageUrl;

    @Column(name = "link")
    String link;

    @Column(name = "start_date", nullable = false)
    LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    @Builder.Default
    LocalDateTime endDate = LocalDateTime.now();

    @Column(name = "created_at")
    @Builder.Default
    LocalDateTime createdAt = LocalDateTime.now();
}

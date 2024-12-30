package com.vinh.cosmetic_web.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "category_id")
    String categoryId;

    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "description")
    String description;

    @Column(name = "image_url", nullable = false)
    String imageUrl;

    @Column(name = "created_at")
    @Builder.Default
    LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "enabled")
    @Builder.Default
    Boolean enabled = true;

    @OneToMany(mappedBy = "category")
    @Builder.Default
    @JsonIgnore
    List<Product> products = new ArrayList<>();
}

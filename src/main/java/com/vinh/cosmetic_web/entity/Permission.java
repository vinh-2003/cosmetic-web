package com.vinh.cosmetic_web.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "permission")
public class Permission {
    @Id
    @Column(name = "name")
    String name;

    @Column(name = "description")
    String description;
}

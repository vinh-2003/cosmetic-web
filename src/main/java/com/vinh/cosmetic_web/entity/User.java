package com.vinh.cosmetic_web.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    String userId;

    @Column(name = "username", nullable = false, unique = true)
    String username;

    @Column(name = "first_name", nullable = false)
    String firstName;

    @Column(name = "last_name", nullable = false)
    String lastName;

    @Column(name = "password", nullable = false)
    String password;

    @Column(name = "email", nullable = false, unique = true)
    String email;

    @Column(name = "phone")
    String phone;

    @Column(name = "enabled")
    @Builder.Default
    Boolean enabled = true;

    @ManyToMany
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_name")
    )
    @Builder.Default
    Set<Role> roles = new HashSet<>();

    @OneToOne(mappedBy = "user")
    Cart cart;

    @OneToMany(mappedBy = "user")
    @Builder.Default
    List<ShippingAddress> shippingAddresses = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    @Builder.Default
    List<Order> orders = new ArrayList<>();
}

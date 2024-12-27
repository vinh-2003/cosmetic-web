package com.vinh.cosmetic_web.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "cart_id")
    String cartId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonIgnore
    User user;

    @Column(name = "created_at")
    @Builder.Default
    LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "cart")
    @Builder.Default
    List<CartItem> cartItems = new ArrayList<>();

    @JsonProperty("total")
    public Long calculateTotal() {
        long total = 0L;

        for (CartItem cartItem : cartItems) {
            long itemTotal = cartItem.getPrice() * cartItem.getQuantity();
            total += itemTotal;
        }

        return total;
    }
}

package com.vinh.cosmetic_web.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "order_item")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "order_item_id")
    String orderItemId;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    Product product;

    @Column(name = "quantity", nullable = false)
    Integer quantity;

    @Column(name = "price", nullable = false)
    Long price;
}

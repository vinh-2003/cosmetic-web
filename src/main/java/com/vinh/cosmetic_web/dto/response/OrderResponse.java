package com.vinh.cosmetic_web.dto.response;

import com.vinh.cosmetic_web.entity.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    String orderId;
    User user;
    Long total;
    OrderStatus currentStatus;
    ShippingAddress shippingAddress;
    Voucher voucher;
    LocalDateTime createdAt;
    List<OrderItem> orderItems;
}

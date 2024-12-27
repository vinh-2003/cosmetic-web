package com.vinh.cosmetic_web.dto.response;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.vinh.cosmetic_web.entity.Cart;
import com.vinh.cosmetic_web.entity.Order;
import com.vinh.cosmetic_web.entity.Role;
import com.vinh.cosmetic_web.entity.ShippingAddress;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String userId;
    String username;
    String firstName;
    String lastName;
    String email;
    String phone;
    Boolean enabled;
    List<Role> roles;
    Cart cart;
    List<ShippingAddress> shippingAddresses;
    List<Order> orders;
}
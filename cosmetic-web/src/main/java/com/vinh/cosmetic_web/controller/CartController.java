package com.vinh.cosmetic_web.controller;

import com.vinh.cosmetic_web.dto.request.ApiResponse;
import com.vinh.cosmetic_web.entity.Cart;
import com.vinh.cosmetic_web.service.CartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartController {
    CartService cartService;

    @GetMapping
    ApiResponse<Cart> getCart() {
        return ApiResponse.<Cart>builder()
                .result(cartService.getCart())
                .build();
    }
}

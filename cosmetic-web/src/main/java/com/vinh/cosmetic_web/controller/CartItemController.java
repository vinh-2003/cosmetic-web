package com.vinh.cosmetic_web.controller;

import com.vinh.cosmetic_web.dto.request.ApiResponse;
import com.vinh.cosmetic_web.dto.request.CartItemRequest;
import com.vinh.cosmetic_web.dto.request.CartItemUpdateRequest;
import com.vinh.cosmetic_web.dto.response.CartItemResponse;
import com.vinh.cosmetic_web.service.CartItemService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cartItems")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartItemController {
    CartItemService cartItemService;

    @PostMapping
    ApiResponse<Void> createCartItem(@RequestBody @Valid CartItemRequest request) {
        cartItemService.addProductToCart(request);
        return ApiResponse.<Void>builder().build();
    }

    @PutMapping
    ApiResponse<CartItemResponse> updateCartItem(@RequestBody @Valid CartItemUpdateRequest request) {
        return ApiResponse.<CartItemResponse>builder()
                .result(cartItemService.updateCartItem(request))
                .build();
    }

    @DeleteMapping("/{cartItemId}")
    ApiResponse<Void> deleteCartItem(@PathVariable String cartItemId) {
        cartItemService.removeCartItem(cartItemId);
        return ApiResponse.<Void>builder().build();
    }

}

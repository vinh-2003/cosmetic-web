package com.vinh.cosmetic_web.controller;

import com.vinh.cosmetic_web.dto.request.ApiResponse;
import com.vinh.cosmetic_web.dto.request.VoucherOrderRequest;
import com.vinh.cosmetic_web.dto.response.OrderResponse;
import com.vinh.cosmetic_web.dto.response.VoucherOrderResponse;
import com.vinh.cosmetic_web.entity.Order;
import com.vinh.cosmetic_web.service.OrderService;
import jakarta.servlet.http.HttpSession;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OrderController {
    OrderService orderService;

    @PostMapping
    ApiResponse<OrderResponse> createOrder() {
        return ApiResponse.<OrderResponse>builder()
                .result(orderService.createOrder())
                .build();
    }

    @GetMapping
    ApiResponse<OrderResponse> getOrder(@RequestParam String orderId) {
        return ApiResponse.<OrderResponse>builder()
                .result(orderService.getOrder(orderId))
                .build();
    }

    @PutMapping("/{orderId}")
    ApiResponse<OrderResponse> updateOrder(@PathVariable("orderId") String orderId, @RequestParam("shippingAddressId") String shippingAddressId) {
        OrderResponse order = orderService.updateOrder(orderId, shippingAddressId);
        return ApiResponse.<OrderResponse>builder()
                .result(order)
                .build();
    }

    @DeleteMapping("/{orderId}")
    ApiResponse<Void> deleteOrder(@PathVariable String orderId) {
        orderService.deleteOrder(orderId);
        return ApiResponse.<Void>builder().build();
    }

    @PostMapping("/apply-voucher")
    ApiResponse<VoucherOrderResponse> applyVoucherToOrder(@RequestBody VoucherOrderRequest request) {
        return ApiResponse.<VoucherOrderResponse>builder()
                .result(orderService.applyVoucherToOrder(request))
                .build();
    }
}

package com.vinh.cosmetic_web.controller.admin;

import com.vinh.cosmetic_web.dto.ApiResponse;
import com.vinh.cosmetic_web.dto.response.OrderResponse;
import com.vinh.cosmetic_web.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/orders")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OrderAdminController {
    OrderService orderService;

    @GetMapping
    ApiResponse<List<OrderResponse>> getOrders(@RequestParam(value = "orderId", required = false) String orderId) {
        if (orderId != null) {
            return ApiResponse.<List<OrderResponse>>builder()
                    .result(orderService.getOrdersForAdmin(orderId))
                    .build();
        }
        return ApiResponse.<List<OrderResponse>>builder()
                .result(orderService.getOrdersForAdmin())
                .build();
    }
}

package com.vinh.cosmetic_web.controller;

import com.vinh.cosmetic_web.dto.request.ApiResponse;
import com.vinh.cosmetic_web.dto.request.ShippingAddressRequest;
import com.vinh.cosmetic_web.dto.response.ShippingAddressResponse;
import com.vinh.cosmetic_web.service.ShippingAddressService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shippingAddresses")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ShippingAddressController {
    ShippingAddressService shippingAddressService;

    @PostMapping
    ApiResponse<ShippingAddressResponse> createShippingAddress(@RequestBody @Valid ShippingAddressRequest request) {
        return ApiResponse.<ShippingAddressResponse>builder()
                .result(shippingAddressService.saveShippingAddress(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<ShippingAddressResponse>> getShippingAddresses() {
        return ApiResponse.<List<ShippingAddressResponse>>builder()
                .result(shippingAddressService.getShippingAddresses())
                .build();
    }

    @GetMapping("/{shippingAddressId}")
    ApiResponse<ShippingAddressResponse> getShippingAddress(@PathVariable String shippingAddressId) {
        return ApiResponse.<ShippingAddressResponse>builder()
                .result(shippingAddressService.getShippingAddress(shippingAddressId))
                .build();
    }

    @DeleteMapping("/{shippingAddressId}")
    ApiResponse<Void> deleteShippingAddress(@PathVariable String shippingAddressId) {
        shippingAddressService.disableShippingAddress(shippingAddressId);
        return ApiResponse.<Void>builder().build();
    }

    @PutMapping("/{shippingAddressId}")
    ApiResponse<ShippingAddressResponse> updateShippingAddress(@PathVariable String shippingAddressId, @RequestBody @Valid ShippingAddressRequest request) {
        return ApiResponse.<ShippingAddressResponse>builder()
                .result(shippingAddressService.updateShippingAddress(shippingAddressId, request))
                .build();
    }
}

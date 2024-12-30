package com.vinh.cosmetic_web.controller.admin;

import com.vinh.cosmetic_web.dto.ApiResponse;
import com.vinh.cosmetic_web.dto.request.ProductRequest;
import com.vinh.cosmetic_web.dto.response.ProductResponse;
import com.vinh.cosmetic_web.service.ProductService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProductController {
    ProductService productService;

    @PostMapping
    ApiResponse<ProductResponse> createProduct(@RequestPart("productData") @Valid ProductRequest request, @RequestPart("imageFile") MultipartFile file) {
        return ApiResponse.<ProductResponse>builder()
                .result(productService.saveProduct(request, file))
                .build();
    }

    @GetMapping
    ApiResponse<List<ProductResponse>> getProducts(@RequestParam(value = "name", required = false) String name, @RequestParam(value = "categoryId", required = false) String categoryId) {
        if (name != null || categoryId != null) {
            return ApiResponse.<List<ProductResponse>>builder()
                    .result(productService.getProducts(name, categoryId))
                    .build();
        }
        return ApiResponse.<List<ProductResponse>>builder()
                .result(productService.getProducts())
                .build();
    }

    @GetMapping("/{productId}")
    ApiResponse<ProductResponse> getProduct(@PathVariable String productId) {
        return ApiResponse.<ProductResponse>builder()
                .result(productService.getProduct(productId))
                .build();
    }

    @PutMapping("/{productId}")
    ApiResponse<ProductResponse> updateProduct(@PathVariable String productId, @RequestPart("productData") @Valid ProductRequest request, @RequestPart(value = "imageFile", required = false) MultipartFile file) {
        return ApiResponse.<ProductResponse>builder()
                .result(productService.updateProduct(productId, request, file))
                .build();
    }

    @DeleteMapping("/{productId}")
    ApiResponse<Void> deleteProduct(@PathVariable String productId) {
        productService.disableProduct(productId);
        return ApiResponse.<Void>builder().build();
    }
}

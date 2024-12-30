package com.vinh.cosmetic_web.controller.admin;

import com.vinh.cosmetic_web.dto.ApiResponse;
import com.vinh.cosmetic_web.dto.request.CategoryRequest;
import com.vinh.cosmetic_web.dto.response.CategoryResponse;
import com.vinh.cosmetic_web.service.CategoryService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CategoryController {
    CategoryService categoryService;

    @PostMapping
    ApiResponse<CategoryResponse> createCategory(@RequestPart("categoryData") @Valid CategoryRequest request, @RequestPart("imageFile") MultipartFile file) {
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.saveCategory(request, file))
                .build();
    }

    @GetMapping
    ApiResponse<List<CategoryResponse>> getCategories(@RequestParam(value = "name", required = false) String name) {
        if (name != null) {
            return ApiResponse.<List<CategoryResponse>>builder()
                    .result(categoryService.getCategories(name))
                    .build();
        }
        return ApiResponse.<List<CategoryResponse>>builder()
                .result(categoryService.getCategories())
                .build();
    }

    @GetMapping("/{categoryId}")
    ApiResponse<CategoryResponse> getCategory(@PathVariable String categoryId) {
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.getCategory(categoryId))
                .build();
    }

    @PutMapping("/{categoryId}")
    ApiResponse<CategoryResponse> updateCategory(@PathVariable String categoryId, @RequestPart("categoryData") @Valid CategoryRequest request, @RequestPart(value = "imageFile", required = false) MultipartFile file) {
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.updateCategory(categoryId, request, file))
                .build();
    }

    @DeleteMapping("/{categoryId}")
    ApiResponse<Void> deleteCategory(@PathVariable String categoryId) {
        categoryService.disableCategory(categoryId);
        return ApiResponse.<Void>builder().build();
    }
}

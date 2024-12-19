package com.vinh.cosmetic_web.dto.request;

import com.vinh.cosmetic_web.entity.Category;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductRequest {
    @NotBlank(message = "PRODUCT_NAME_REQUIRED") // Không được để trống
    @Size(max = 255, message = "PRODUCT_NAME_TOO_LONG") // Giới hạn độ dài
    String name;

    String description;

    @NotNull(message = "PRODUCT_PRICE_REQUIRED") // Bắt buộc
    @Min(value = 0, message = "PRODUCT_PRICE_MUST_BE_POSITIVE") // Giá không được âm
    Long price;

    @NotNull(message = "PRODUCT_STOCK_QUANTITY_REQUIRED") // Bắt buộc
    @Min(value = 0, message = "PRODUCT_STOCK_QUANTITY_MUST_BE_POSITIVE") // Số lượng tồn kho không được âm
    Integer stockQuantity;

    @NotNull(message = "CATEGORY_REQUIRED") // Category không được null
    Category category;

    @NotBlank(message = "PRODUCT_BRAND_REQUIRED") // Không được để trống
    @Size(max = 100, message = "PRODUCT_BRAND_TOO_LONG") // Giới hạn độ dài
    String brand;

    @Min(value = 0, message = "PRODUCT_DISCOUNT_PERCENTAGE_MUST_BE_POSITIVE") // Không được âm
    @Max(value = 100, message = "PRODUCT_DISCOUNT_PERCENTAGE_TOO_HIGH") // Tối đa là 100%
    Integer discountPercentage;
}

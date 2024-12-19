package com.vinh.cosmetic_web.dto.response;

import com.vinh.cosmetic_web.entity.Category;
import com.vinh.cosmetic_web.entity.Review;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    String productId;
    String name;
    String description;
    Long price;
    Integer stockQuantity;
    String imageUrl;
    Category category;
    String brand;
    LocalDateTime createdAt;
    Integer discountPercentage;
    BigDecimal averageRating;
    Boolean enabled;
    List<Review> reviews;
}

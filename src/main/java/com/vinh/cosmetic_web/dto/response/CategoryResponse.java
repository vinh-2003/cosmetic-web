package com.vinh.cosmetic_web.dto.response;

import com.vinh.cosmetic_web.entity.Product;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryResponse {
    String categoryId;
    String name;
    String description;
    String imageUrl;
    LocalDateTime createdAt;
    Boolean enabled;
    List<Product> products;
}

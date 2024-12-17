package com.vinh.cosmetic_web.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryRequest {
    @NotBlank(message = "CATEGORY_NAME_REQUIRED") // Không được để trống
    @Size(max = 100, message = "CATEGORY_NAME_TOO_LONG") // Giới hạn độ dài
    String name;

    String description;
}

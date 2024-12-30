package com.vinh.cosmetic_web.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PasswordUpdateRequest {
    @NotBlank(message = "PASSWORD_REQUIRED") // Không được để trống
    @Size(min = 6, max = 50, message = "INVALID_PASSWORD")
    String oldPassword;

    @NotBlank(message = "PASSWORD_REQUIRED") // Không được để trống
    @Size(min = 6, max = 50, message = "INVALID_PASSWORD")
    String newPassword;
}

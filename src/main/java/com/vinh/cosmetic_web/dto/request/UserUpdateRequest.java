package com.vinh.cosmetic_web.dto.request;

import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    @NotBlank(message = "FIRST_NAME_REQUIRED") // Không được để trống
    @Size(max = 50, message = "FIRST_NAME_TOO_LONG") // Giới hạn độ dài
    String firstName;

    @NotBlank(message = "LAST_NAME_REQUIRED")
    @Size(max = 50, message = "LAST_NAME_TOO_LONG")
    String lastName;

//    @NotBlank(message = "PASSWORD_REQUIRED") // Không được để trống
//    @Size(min = 6, max = 50, message = "INVALID_PASSWORD")
//    String password;

    @NotBlank(message = "EMAIL_REQUIRED")
    @Email(message = "EMAIL_INVALID") // Kiểm tra định dạng email
    String email;

    @Pattern(regexp = "^(\\d{10})?$", message = "PHONE_INVALID") // Số điện thoại hợp lệ
    String phone;

//    List<String> roles;
}
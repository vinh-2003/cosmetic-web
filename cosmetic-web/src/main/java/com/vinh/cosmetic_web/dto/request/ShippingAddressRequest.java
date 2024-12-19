package com.vinh.cosmetic_web.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShippingAddressRequest {
    @NotBlank(message = "RECIPIENT_NAME_REQUIRED") // Không được để trống
    @Size(max = 100, message = "RECIPIENT_NAME_TOO_LONG") // Giới hạn tối đa 100 ký tự
    String recipientName;

    @NotBlank(message = "RECIPIENT_PHONE_REQUIRED") // Không được để trống
    @Pattern(regexp = "^(\\d{10})$", message = "RECIPIENT_PHONE_INVALID") // Phải là số điện thoại hợp lệ
    String recipientPhone;

    @NotBlank(message = "RECIPIENT_ADDRESS_REQUIRED") // Không được để trống
    @Size(max = 255, message = "RECIPIENT_ADDRESS_TOO_LONG") // Giới hạn tối đa 255 ký tự
    String recipientAddress;
}

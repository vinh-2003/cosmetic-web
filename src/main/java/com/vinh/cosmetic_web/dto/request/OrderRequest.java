package com.vinh.cosmetic_web.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderRequest {
    @NotBlank(message = "SHIPPING_ADDRESS_ID_REQUIRED")
    String shippingAddressId;

    @NotBlank(message = "VOUCHER_ID_REQUIRED")
    String voucherId;
}

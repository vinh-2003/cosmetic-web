package com.vinh.cosmetic_web.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShippingAddressResponse {
    String shippingAddressId;
    String recipientName;
    String recipientPhone;
    String recipientAddress;
    Boolean isDefault;
    Boolean enabled;
}

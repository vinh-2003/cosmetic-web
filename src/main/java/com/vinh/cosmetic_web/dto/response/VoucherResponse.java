package com.vinh.cosmetic_web.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VoucherResponse {
    String voucherId;
    String code;
    Integer discount;
    LocalDateTime startDate;
    LocalDateTime endDate;
    Long minPurchase;
    Integer usageLimit;
    LocalDateTime createdAt;
    Boolean enabled;
}

package com.vinh.cosmetic_web.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VoucherUpdateRequest {
    @NotBlank(message = "VOUCHER_CODE_REQUIRED") // Code không được để trống
    @Size(min = 5, max = 20, message = "VOUCHER_CODE_LENGTH_BETWEEN_5_AND_20") // Giới hạn độ dài code
    String code;

    @NotNull(message = "VOUCHER_DISCOUNT_REQUIRED") // Bắt buộc phải có discount
    @Positive(message = "VOUCHER_DISCOUNT_MUST_BE_POSITIVE")
    Integer discount;

    LocalDateTime startDate;

    LocalDateTime endDate;

    @PositiveOrZero(message = "VOUCHER_MIN_PURCHASE_MUST_BE_ZERO_OR_POSITIVE") // Giá trị mua tối thiểu phải >= 0
    Long minPurchase;

    @PositiveOrZero(message = "VOUCHER_USAGE_LIMIT_MUST_BE_ZERO_OR_POSITIVE") // Giới hạn sử dụng phải >= 0
    Integer usageLimit;
}

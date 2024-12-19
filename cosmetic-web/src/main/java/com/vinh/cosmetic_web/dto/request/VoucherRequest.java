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
public class VoucherRequest {
    @NotBlank(message = "VOUCHER_CODE_REQUIRED") // Code không được để trống
    @Size(min = 5, max = 20, message = "VOUCHER_CODE_LENGTH_BETWEEN_5_AND_20") // Giới hạn độ dài code
    String code;

    @NotNull(message = "VOUCHER_DISCOUNT_REQUIRED") // Bắt buộc phải có discount
    @Min(value = 1, message = "VOUCHER_DISCOUNT_MUST_BE_AT_LEAST_1") // Discount không nhỏ hơn 1
    @Max(value = 100, message = "VOUCHER_DISCOUNT_MUST_BE_LESS_THAN_100") // Discount không quá 100%
    Integer discount;

    @NotNull(message = "VOUCHER_START_DATE_REQUIRED") // Bắt buộc phải có ngày bắt đầu
    @FutureOrPresent(message = "VOUCHER_START_DATE_MUST_BE_FUTURE_OR_PRESENT") // Ngày bắt đầu không được trong quá khứ
    LocalDateTime startDate;

    @NotNull(message = "VOUCHER_END_DATE_REQUIRED") // Bắt buộc phải có ngày kết thúc
    @Future(message = "VOUCHER_END_DATE_MUST_BE_IN_FUTURE") // Ngày kết thúc phải trong tương lai
    LocalDateTime endDate;

    @PositiveOrZero(message = "VOUCHER_MIN_PURCHASE_MUST_BE_ZERO_OR_POSITIVE") // Giá trị mua tối thiểu phải >= 0
    Long minPurchase;

    @PositiveOrZero(message = "VOUCHER_USAGE_LIMIT_MUST_BE_ZERO_OR_POSITIVE") // Giới hạn sử dụng phải >= 0
    Integer usageLimit;
}

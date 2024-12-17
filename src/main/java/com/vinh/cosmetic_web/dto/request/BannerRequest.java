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
public class BannerRequest {
    String link;

    @NotNull(message = "BANNER_START_DATE_REQUIRED") // Bắt buộc phải có ngày bắt đầu
    @FutureOrPresent(message = "BANNER_START_DATE_MUST_BE_FUTURE_OR_PRESENT") // Ngày bắt đầu không được trong quá khứ
    LocalDateTime startDate;

    @NotNull(message = "BANNER_END_DATE_REQUIRED") // Bắt buộc phải có ngày kết thúc
    @Future(message = "BANNER_END_DATE_MUST_BE_IN_FUTURE") // Ngày kết thúc phải lớn hơn hiện tại
    LocalDateTime endDate;
}

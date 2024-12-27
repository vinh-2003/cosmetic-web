package com.vinh.cosmetic_web.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BannerUpdateRequest {
    String link;
    LocalDateTime startDate;
    LocalDateTime endDate;
}

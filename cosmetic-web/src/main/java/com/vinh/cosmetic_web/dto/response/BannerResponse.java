package com.vinh.cosmetic_web.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BannerResponse {
    String bannerId;
    String imageUrl;
    String link;
    LocalDateTime startDate;
    LocalDateTime endDate;
    LocalDateTime createdAt;
}

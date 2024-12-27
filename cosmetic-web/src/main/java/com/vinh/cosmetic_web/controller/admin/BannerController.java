package com.vinh.cosmetic_web.controller.admin;

import com.vinh.cosmetic_web.dto.request.ApiResponse;
import com.vinh.cosmetic_web.dto.request.BannerRequest;
import com.vinh.cosmetic_web.dto.request.BannerUpdateRequest;
import com.vinh.cosmetic_web.dto.response.BannerResponse;
import com.vinh.cosmetic_web.service.BannerService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/banners")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BannerController {
    BannerService bannerService;

    @PostMapping
    ApiResponse<BannerResponse> createBanner(@RequestPart("bannerData") @Valid BannerRequest request, @RequestPart("imageFile") MultipartFile file) {
        return ApiResponse.<BannerResponse>builder()
                .result(bannerService.saveBanner(request, file))
                .build();
    }

    @GetMapping
    ApiResponse<List<BannerResponse>> getBanners(@RequestParam(value = "link", required = false) String link) {
        if (link != null) {
            return ApiResponse.<List<BannerResponse>>builder()
                    .result(bannerService.getBanners(link))
                    .build();
        }
        return ApiResponse.<List<BannerResponse>>builder()
                .result(bannerService.getBanners())
                .build();
    }

    @GetMapping("/{bannerId}")
    ApiResponse<BannerResponse> getBanner(@PathVariable String bannerId) {
        return ApiResponse.<BannerResponse>builder()
                .result(bannerService.getBanner(bannerId))
                .build();
    }

    @PutMapping("/{bannerId}")
    ApiResponse<BannerResponse> updateBanner(@PathVariable String bannerId, @RequestPart("bannerData") @Valid BannerUpdateRequest request, @RequestPart(value = "imageFile", required = false) MultipartFile file) {
        return ApiResponse.<BannerResponse>builder()
                .result(bannerService.updateBanner(bannerId, request, file))
                .build();
    }

    @DeleteMapping("/{bannerId}")
    ApiResponse<Void> deleteBanner(@PathVariable String bannerId) {
        bannerService.deleteBanner(bannerId);
        return ApiResponse.<Void>builder().build();
    }
}

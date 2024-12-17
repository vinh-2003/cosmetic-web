package com.vinh.cosmetic_web.service;

import com.vinh.cosmetic_web.dto.request.BannerRequest;
import com.vinh.cosmetic_web.dto.response.BannerResponse;
import com.vinh.cosmetic_web.entity.Banner;
import com.vinh.cosmetic_web.entity.Category;
import com.vinh.cosmetic_web.exception.AppException;
import com.vinh.cosmetic_web.exception.ErrorCode;
import com.vinh.cosmetic_web.mapper.BannerMapper;
import com.vinh.cosmetic_web.repository.BannerRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BannerService {
    BannerRepository bannerRepository;
    CloudinaryService cloudinaryService;
    BannerMapper bannerMapper;

    public List<BannerResponse> getBanners() {
        return bannerRepository.findAll().stream().map(bannerMapper::toBannerResponse).toList();
    }

    public BannerResponse getBanner(String bannerId) {
        return bannerMapper.toBannerResponse(bannerRepository.findById(bannerId).orElseThrow(() -> new AppException(ErrorCode.BANNER_NOT_EXISTED)));
    }

    public void deleteBanner(String bannerId) {
        bannerRepository.deleteById(bannerId);
    }

    public BannerResponse saveBanner(BannerRequest request, MultipartFile file) {
        Banner banner = bannerMapper.toBanner(request);
        if (!file.isEmpty()) {
            try {
                String imageUrl = cloudinaryService.uploadFile(file);
                banner.setImageUrl(imageUrl);
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else if (banner.getBannerId() != null) {
            Banner existingBanner = bannerRepository.findById(banner.getBannerId()).orElseThrow(() -> new AppException(ErrorCode.BANNER_NOT_EXISTED));
            if (existingBanner != null) {
                banner.setImageUrl(existingBanner.getImageUrl());
            }
        }
        return bannerMapper.toBannerResponse(bannerRepository.save(banner));
    }
}

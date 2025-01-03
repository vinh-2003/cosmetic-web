package com.vinh.cosmetic_web.mapper;

import com.vinh.cosmetic_web.dto.request.BannerRequest;
import com.vinh.cosmetic_web.dto.request.BannerUpdateRequest;
import com.vinh.cosmetic_web.dto.response.BannerResponse;
import com.vinh.cosmetic_web.entity.Banner;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface BannerMapper {
    Banner toBanner(BannerRequest request);

    BannerResponse toBannerResponse(Banner banner);

    void updateBanner(@MappingTarget Banner banner, BannerUpdateRequest request);
}

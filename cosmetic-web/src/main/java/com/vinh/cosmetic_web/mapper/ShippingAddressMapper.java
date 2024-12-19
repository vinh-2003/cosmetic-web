package com.vinh.cosmetic_web.mapper;

import com.vinh.cosmetic_web.dto.request.ShippingAddressRequest;
import com.vinh.cosmetic_web.dto.response.ShippingAddressResponse;
import com.vinh.cosmetic_web.entity.ShippingAddress;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ShippingAddressMapper {
    ShippingAddress toShippingAddress(ShippingAddressRequest request);

    ShippingAddressResponse toShippingAddressResponse(ShippingAddress shippingAddress);

    void updateShippingAddress(@MappingTarget ShippingAddress shippingAddress, ShippingAddressRequest request);
}

package com.vinh.cosmetic_web.mapper;

import com.vinh.cosmetic_web.dto.request.OrderRequest;
import com.vinh.cosmetic_web.dto.response.OrderResponse;
import com.vinh.cosmetic_web.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderResponse toOrderResponse(Order order);
}

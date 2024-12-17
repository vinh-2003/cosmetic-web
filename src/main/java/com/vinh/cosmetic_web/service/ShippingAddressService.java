package com.vinh.cosmetic_web.service;

import com.nimbusds.jose.proc.SecurityContext;
import com.vinh.cosmetic_web.dto.request.ShippingAddressRequest;
import com.vinh.cosmetic_web.dto.response.ShippingAddressResponse;
import com.vinh.cosmetic_web.entity.ShippingAddress;
import com.vinh.cosmetic_web.entity.User;
import com.vinh.cosmetic_web.exception.AppException;
import com.vinh.cosmetic_web.exception.ErrorCode;
import com.vinh.cosmetic_web.mapper.ShippingAddressMapper;
import com.vinh.cosmetic_web.repository.ShippingAddressRepository;
import com.vinh.cosmetic_web.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ShippingAddressService {
    ShippingAddressRepository shippingAddressRepository;
    ShippingAddressMapper shippingAddressMapper;
    UserRepository userRepository;

    public ShippingAddressResponse getShippingAddress(String shippingAddressId) {
        return shippingAddressMapper.toShippingAddressResponse(shippingAddressRepository.findById(shippingAddressId).orElseThrow(() -> new AppException(ErrorCode.SHIPPING_ADDRESS_NOT_EXISTED)));
    }

    public ShippingAddressResponse saveShippingAddress(ShippingAddressRequest request) {
        ShippingAddress shippingAddress = shippingAddressMapper.toShippingAddress(request);

        return shippingAddressMapper.toShippingAddressResponse(shippingAddressRepository.save(shippingAddress));
    }

    public ShippingAddressResponse getMyFirstShippingAddress() {
        var context = SecurityContextHolder.getContext();
        var username = context.getAuthentication().getName();

        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return shippingAddressMapper.toShippingAddressResponse(shippingAddressRepository.findFirstByUserOrderByShippingAddressIdAsc(user));
    }
}

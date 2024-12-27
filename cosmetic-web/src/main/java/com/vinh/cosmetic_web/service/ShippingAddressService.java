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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ShippingAddressService {
    ShippingAddressRepository shippingAddressRepository;
    ShippingAddressMapper shippingAddressMapper;
    UserRepository userRepository;

    @PreAuthorize("hasRole('USER')")
    public List<ShippingAddressResponse> getShippingAddresses() {
        var context = SecurityContextHolder.getContext();
        var username = context.getAuthentication().getName();

        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return shippingAddressRepository.findByUserAndEnabled(user, true).stream().map(shippingAddressMapper::toShippingAddressResponse).toList();
    }

    public ShippingAddressResponse getShippingAddress(String shippingAddressId) {
        return shippingAddressMapper.toShippingAddressResponse(shippingAddressRepository.findById(shippingAddressId).orElseThrow(() -> new AppException(ErrorCode.SHIPPING_ADDRESS_NOT_EXISTED)));
    }

    @PreAuthorize("hasRole('USER')")
    @Transactional
    public ShippingAddressResponse saveShippingAddress(ShippingAddressRequest request) {
        var context = SecurityContextHolder.getContext();
        var username = context.getAuthentication().getName();

        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        ShippingAddress shippingAddress = shippingAddressMapper.toShippingAddress(request);
        shippingAddress.setUser(user);

        return shippingAddressMapper.toShippingAddressResponse(shippingAddressRepository.save(shippingAddress));
    }

    @PreAuthorize("hasRole('USER')")
    public ShippingAddressResponse getMyFirstShippingAddress() {
        var context = SecurityContextHolder.getContext();
        var username = context.getAuthentication().getName();

        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return shippingAddressMapper.toShippingAddressResponse(shippingAddressRepository.findFirstByUserAndEnabledOrderByShippingAddressIdAsc(user, true));
    }

    @PreAuthorize("hasRole('USER')")
    @Transactional
    public ShippingAddressResponse updateShippingAddress(String shippingAddressId, ShippingAddressRequest request) {
        ShippingAddress shippingAddress = shippingAddressRepository.findById(shippingAddressId).orElseThrow(() -> new AppException(ErrorCode.SHIPPING_ADDRESS_NOT_EXISTED));

        shippingAddressMapper.updateShippingAddress(shippingAddress, request);

        return shippingAddressMapper.toShippingAddressResponse(shippingAddressRepository.save(shippingAddress));
    }

    @PreAuthorize("hasRole('USER')")
    @Transactional
    public void disableShippingAddress(String shippingAddressId) {
        ShippingAddress shippingAddress = shippingAddressRepository.findById(shippingAddressId).orElseThrow(() -> new AppException(ErrorCode.SHIPPING_ADDRESS_NOT_EXISTED));

        shippingAddress.setEnabled(false);

        shippingAddressRepository.save(shippingAddress);
    }
}

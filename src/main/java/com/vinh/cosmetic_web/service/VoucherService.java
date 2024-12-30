package com.vinh.cosmetic_web.service;

import com.vinh.cosmetic_web.dto.request.VoucherOrderRequest;
import com.vinh.cosmetic_web.dto.request.VoucherRequest;
import com.vinh.cosmetic_web.dto.request.VoucherUpdateRequest;
import com.vinh.cosmetic_web.dto.response.VoucherOrderResponse;
import com.vinh.cosmetic_web.dto.response.VoucherResponse;
import com.vinh.cosmetic_web.entity.Order;
import com.vinh.cosmetic_web.entity.Voucher;
import com.vinh.cosmetic_web.exception.AppException;
import com.vinh.cosmetic_web.exception.ErrorCode;
import com.vinh.cosmetic_web.mapper.VoucherMapper;
import com.vinh.cosmetic_web.repository.OrderRepository;
import com.vinh.cosmetic_web.repository.VoucherRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class VoucherService {
    VoucherRepository voucherRepository;
    VoucherMapper voucherMapper;

    @PreAuthorize("hasRole('ADMIN')")
    public List<VoucherResponse> getVouchers() {
        return voucherRepository.findByEnabled(true).stream().map(voucherMapper::toVoucherResponse).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<VoucherResponse> getVouchers(String code) {
        return voucherRepository.findByCodeContainingIgnoreCaseAndEnabled(code, true).stream().map(voucherMapper::toVoucherResponse).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public VoucherResponse getVoucher(String voucherId) {
        return voucherMapper.toVoucherResponse(voucherRepository.findById(voucherId).orElseThrow(() -> new AppException(ErrorCode.VOUCHER_NOT_EXISTED)));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public void deleteVoucher(String voucherId) {
        voucherRepository.deleteById(voucherId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void disableVoucher(String voucherId) {
        Voucher voucher = voucherRepository.findById(voucherId).orElseThrow(() -> new AppException(ErrorCode.VOUCHER_NOT_EXISTED));

        voucher.setEnabled(false);

        voucherRepository.save(voucher);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public VoucherResponse saveVoucher(VoucherRequest request) {
        Voucher voucher = voucherMapper.toVoucher(request);

        return voucherMapper.toVoucherResponse(voucherRepository.save(voucher));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public VoucherResponse updateVoucher(String voucherId, VoucherUpdateRequest request) {
        Voucher voucher = voucherRepository.findById(voucherId).orElseThrow(() -> new AppException(ErrorCode.VOUCHER_NOT_EXISTED));

        voucherMapper.updateVoucher(voucher, request);

        return voucherMapper.toVoucherResponse(voucherRepository.save(voucher));
    }

}

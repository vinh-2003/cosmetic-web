package com.vinh.cosmetic_web.service;

import com.vinh.cosmetic_web.dto.request.VoucherRequest;
import com.vinh.cosmetic_web.dto.response.VoucherResponse;
import com.vinh.cosmetic_web.entity.Voucher;
import com.vinh.cosmetic_web.exception.AppException;
import com.vinh.cosmetic_web.exception.ErrorCode;
import com.vinh.cosmetic_web.mapper.VoucherMapper;
import com.vinh.cosmetic_web.repository.VoucherRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class VoucherService {
    VoucherRepository voucherRepository;
    VoucherMapper voucherMapper;

    public List<VoucherResponse> getVouchers() {
        return voucherRepository.findAll().stream().map(voucherMapper::toVoucherResponse).toList();
    }

    public VoucherResponse getVoucher(String voucherId) {
        return voucherMapper.toVoucherResponse(voucherRepository.findById(voucherId).orElseThrow(() -> new AppException(ErrorCode.VOUCHER_NOT_EXISTED)));
    }

    public void deleteVoucher(String voucherId) {
        voucherRepository.deleteById(voucherId);
    }

    public void disableVoucher(String voucherId) {
        Voucher voucher = voucherRepository.findById(voucherId).orElseThrow(() -> new AppException(ErrorCode.VOUCHER_NOT_EXISTED));

        voucher.setEnabled(false);

        voucherRepository.save(voucher);
    }

    public VoucherResponse saveVoucher(VoucherRequest request) {
        Voucher voucher = voucherMapper.toVoucher(request);

        return voucherMapper.toVoucherResponse(voucherRepository.save(voucher));
    }

}

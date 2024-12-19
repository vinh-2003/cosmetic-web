package com.vinh.cosmetic_web.mapper;

import com.vinh.cosmetic_web.dto.request.VoucherRequest;
import com.vinh.cosmetic_web.dto.response.VoucherResponse;
import com.vinh.cosmetic_web.entity.Voucher;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface VoucherMapper {
    Voucher toVoucher(VoucherRequest request);

    VoucherResponse toVoucherResponse(Voucher voucher);

    void updateVoucher(@MappingTarget Voucher voucher, VoucherRequest request);
}

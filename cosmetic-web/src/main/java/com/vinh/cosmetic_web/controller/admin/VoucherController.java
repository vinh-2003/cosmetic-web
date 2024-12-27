package com.vinh.cosmetic_web.controller.admin;

import com.vinh.cosmetic_web.dto.request.ApiResponse;
import com.vinh.cosmetic_web.dto.request.VoucherRequest;
import com.vinh.cosmetic_web.dto.request.VoucherUpdateRequest;
import com.vinh.cosmetic_web.dto.response.VoucherResponse;
import com.vinh.cosmetic_web.service.VoucherService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/vouchers")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class VoucherController {
    VoucherService voucherService;

    @PostMapping
    ApiResponse<VoucherResponse> createVoucher(@RequestBody @Valid VoucherRequest request) {
        return ApiResponse.<VoucherResponse>builder()
                .result(voucherService.saveVoucher(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<VoucherResponse>> getVouchers(@RequestParam(value = "code", required = false) String code) {
        if (code != null) {
            return ApiResponse.<List<VoucherResponse>>builder()
                    .result(voucherService.getVouchers(code))
                    .build();
        }
        return ApiResponse.<List<VoucherResponse>>builder()
                .result(voucherService.getVouchers())
                .build();
    }

    @GetMapping("/{voucherId}")
    ApiResponse<VoucherResponse> getVoucher(@PathVariable String voucherId) {
        return ApiResponse.<VoucherResponse>builder()
                .result(voucherService.getVoucher(voucherId))
                .build();
    }

    @PutMapping("/{voucherId}")
    ApiResponse<VoucherResponse> updateVoucher(@PathVariable String voucherId, @RequestBody @Valid VoucherUpdateRequest request) {
        return ApiResponse.<VoucherResponse>builder()
                .result(voucherService.updateVoucher(voucherId, request))
                .build();
    }

    @DeleteMapping("/{voucherId}")
    ApiResponse<Void> deleteVoucher(@PathVariable String voucherId) {
        voucherService.disableVoucher(voucherId);
        return ApiResponse.<Void>builder().build();
    }
}

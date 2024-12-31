package com.vinh.cosmetic_web.controller;

import com.vinh.cosmetic_web.configuration.VNPayConfig;
import com.vinh.cosmetic_web.dto.ApiResponse;
import com.vinh.cosmetic_web.dto.response.PaymentResDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.vinh.cosmetic_web.configuration.VNPayConfig.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @GetMapping("create_payment")
    public ApiResponse<PaymentResDTO> createPayment(
            @RequestParam("amount") long amount,
            /* @RequestParam("bankCode") String bankCode,*/
            HttpServletRequest req) throws UnsupportedEncodingException {

        String orderType = "other";
        amount = amount * 100;

        String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
        String vnp_IpAddr = VNPayConfig.getIpAddress(req);

        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
//        vnp_Params.put("vnp_BankCode", bankCode);
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);


 
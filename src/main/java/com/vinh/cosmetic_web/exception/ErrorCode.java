package com.vinh.cosmetic_web.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    USERNAME_REQUIRED(1009, "Username cannot be blank", HttpStatus.BAD_REQUEST),
    FIRST_NAME_REQUIRED(1010, "First name cannot be blank", HttpStatus.BAD_REQUEST),
    FIRST_NAME_TOO_LONG(1011, "First name must be less than 50 characters", HttpStatus.BAD_REQUEST),
    LAST_NAME_REQUIRED(1012, "Last name cannot be blank", HttpStatus.BAD_REQUEST),
    LAST_NAME_TOO_LONG(1013, "Last name must be less than 50 characters", HttpStatus.BAD_REQUEST),
    PASSWORD_REQUIRED(1014, "Password cannot be blank", HttpStatus.BAD_REQUEST),
    EMAIL_REQUIRED(1015, "Email cannot be blank", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(1016, "Email format is invalid", HttpStatus.BAD_REQUEST),
    PHONE_INVALID(1017, "Phone number must be exactly 10 digits", HttpStatus.BAD_REQUEST),

    CATEGORY_NOT_EXISTED(2002, "Category not existed", HttpStatus.NOT_FOUND),
    CATEGORY_NAME_REQUIRED(2003, "Category name cannot be blank", HttpStatus.BAD_REQUEST),
    CATEGORY_NAME_TOO_LONG(2004, "Category name must be less than 100 characters", HttpStatus.BAD_REQUEST),

    BANNER_NOT_EXISTED(3002, "Banner not existed", HttpStatus.NOT_FOUND),
    BANNER_START_DATE_REQUIRED(3003, "Start date can not null", HttpStatus.BAD_REQUEST),
    BANNER_START_DATE_MUST_BE_FUTURE_OR_PRESENT(3004, "Start date must be future or present", HttpStatus.BAD_REQUEST),
    BANNER_END_DATE_REQUIRED(3005, "End date can not null", HttpStatus.BAD_REQUEST),
    BANNER_END_DATE_MUST_BE_IN_FUTURE(3006, "End date must be in future", HttpStatus.BAD_REQUEST),

    PRODUCT_NOT_EXISTED(4002, "Product not existed", HttpStatus.NOT_FOUND),
    PRODUCT_NAME_REQUIRED(4003, "Product name cannot be blank", HttpStatus.BAD_REQUEST),
    PRODUCT_NAME_TOO_LONG(4004, "Product name must be less than 255 characters", HttpStatus.BAD_REQUEST),
    PRODUCT_PRICE_REQUIRED(4005, "Product price cannot be blank", HttpStatus.BAD_REQUEST),
    PRODUCT_PRICE_MUST_BE_POSITIVE(4006, "Product price must be positive", HttpStatus.BAD_REQUEST),
    PRODUCT_STOCK_QUANTITY_REQUIRED(4007, "Product stock quantity cannot be blank", HttpStatus.BAD_REQUEST),
    PRODUCT_STOCK_QUANTITY_MUST_BE_POSITIVE(4008, "Product stock quantity must be positive", HttpStatus.BAD_REQUEST),
    CATEGORY_REQUIRED(4009, "Category cannot be blank", HttpStatus.BAD_REQUEST),
    PRODUCT_BRAND_REQUIRED(4010, "Product brand cannot be blank", HttpStatus.BAD_REQUEST),
    PRODUCT_BRAND_TOO_LONG(4011, "Product brand must be less than 100 characters", HttpStatus.BAD_REQUEST),
    PRODUCT_DISCOUNT_PERCENTAGE_MUST_BE_POSITIVE(4012, "Product discount percentage must be positive", HttpStatus.BAD_REQUEST),
    PRODUCT_DISCOUNT_PERCENTAGE_TOO_HIGH(4013, "Product discount percentage must be less than 100", HttpStatus.BAD_REQUEST),

    VOUCHER_NOT_EXISTED(5002, "Voucher not existed", HttpStatus.NOT_FOUND),
    VOUCHER_CODE_REQUIRED(5003, "Voucher code is required", HttpStatus.BAD_REQUEST),
    VOUCHER_CODE_LENGTH_BETWEEN_5_AND_20(5004, "Voucher code length must be between 5 and 20 characters", HttpStatus.BAD_REQUEST),
    VOUCHER_DISCOUNT_REQUIRED(5005, "Voucher discount is required", HttpStatus.BAD_REQUEST),
    VOUCHER_DISCOUNT_MUST_BE_AT_LEAST_1(5006, "Voucher discount must be at least 1%", HttpStatus.BAD_REQUEST),
    VOUCHER_DISCOUNT_MUST_BE_LESS_THAN_100(5007, "Voucher discount must be less than 100%", HttpStatus.BAD_REQUEST),
    VOUCHER_START_DATE_REQUIRED(5008, "Voucher start date is required", HttpStatus.BAD_REQUEST),
    VOUCHER_START_DATE_MUST_BE_FUTURE_OR_PRESENT(5009, "Voucher start date must be in the future or present", HttpStatus.BAD_REQUEST),
    VOUCHER_END_DATE_REQUIRED(5010, "Voucher end date is required", HttpStatus.BAD_REQUEST),
    VOUCHER_END_DATE_MUST_BE_IN_FUTURE(5011, "Voucher end date must be in the future", HttpStatus.BAD_REQUEST),
    VOUCHER_MIN_PURCHASE_MUST_BE_ZERO_OR_POSITIVE(5012, "Minimum purchase amount must be zero or positive", HttpStatus.BAD_REQUEST),
    VOUCHER_USAGE_LIMIT_MUST_BE_POSITIVE(5013, "Usage limit must be a positive number", HttpStatus.BAD_REQUEST),

    SHIPPING_ADDRESS_NOT_EXISTED(6002, "Shipping address not existed", HttpStatus.NOT_FOUND),
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
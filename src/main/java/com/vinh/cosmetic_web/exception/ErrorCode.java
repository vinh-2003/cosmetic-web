package com.vinh.cosmetic_web.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Lỗi không xác định", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Khóa không hợp lệ", HttpStatus.BAD_REQUEST),
    USERNAME_EXISTED(1002, "Tên người dùng đã tồn tại", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Tên người dùng phải có ít nhất {min} ký tự", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Mật khẩu phải có ít nhất {min} ký tự", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "Người dùng không tồn tại", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Chưa xác thực", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "Bạn không có quyền truy cập", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Tuổi của bạn phải ít nhất là {min}", HttpStatus.BAD_REQUEST),
    USERNAME_REQUIRED(1009, "Tên người dùng không được để trống", HttpStatus.BAD_REQUEST),
    FIRST_NAME_REQUIRED(1010, "Tên không được để trống", HttpStatus.BAD_REQUEST),
    FIRST_NAME_TOO_LONG(1011, "Tên không được vượt quá 50 ký tự", HttpStatus.BAD_REQUEST),
    LAST_NAME_REQUIRED(1012, "Họ không được để trống", HttpStatus.BAD_REQUEST),
    LAST_NAME_TOO_LONG(1013, "Họ không được vượt quá 50 ký tự", HttpStatus.BAD_REQUEST),
    PASSWORD_REQUIRED(1014, "Mật khẩu không được để trống", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED(1015, "Email đã tồn tại", HttpStatus.BAD_REQUEST),
    EMAIL_REQUIRED(1015, "Email không được để trống", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(1016, "Định dạng email không hợp lệ", HttpStatus.BAD_REQUEST),
    PHONE_INVALID(1017, "Số điện thoại phải có đúng 10 chữ số", HttpStatus.BAD_REQUEST),
    ACCOUNT_DISABLED(1018, "Tài khoản đã bị vô hiệu hoá", HttpStatus.BAD_REQUEST),
    PASSWORD_INCORRECT(1019, "Mật khẩu hiện tại không đúng", HttpStatus.BAD_REQUEST),

    CATEGORY_NOT_EXISTED(2002, "Danh mục không tồn tại", HttpStatus.NOT_FOUND),
    CATEGORY_NAME_REQUIRED(2003, "Tên danh mục không được để trống", HttpStatus.BAD_REQUEST),
    CATEGORY_NAME_TOO_LONG(2004, "Tên danh mục không được vượt quá 100 ký tự", HttpStatus.BAD_REQUEST),

    BANNER_NOT_EXISTED(3002, "Banner không tồn tại", HttpStatus.NOT_FOUND),
    BANNER_START_DATE_REQUIRED(3003, "Ngày bắt đầu không được để trống", HttpStatus.BAD_REQUEST),
    BANNER_START_DATE_MUST_BE_FUTURE_OR_PRESENT(3004, "Ngày bắt đầu phải là hiện tại hoặc tương lai", HttpStatus.BAD_REQUEST),
    BANNER_END_DATE_REQUIRED(3005, "Ngày kết thúc không được để trống", HttpStatus.BAD_REQUEST),
    BANNER_END_DATE_MUST_BE_IN_FUTURE(3006, "Ngày kết thúc phải nằm trong tương lai", HttpStatus.BAD_REQUEST),

    
    VOUCHER_NOT_EXISTED(5002, "Mã giảm giá không tồn tại", HttpStatus.NOT_FOUND),
    VOUCHER_CODE_REQUIRED(5003, "Mã giảm giá là bắt buộc", HttpStatus.BAD_REQUEST),
    VOUCHER_CODE_LENGTH_BETWEEN_5_AND_20(5004, "Độ dài mã giảm giá phải từ 5 đến 20 ký tự", HttpStatus.BAD_REQUEST),
    VOUCHER_DISCOUNT_REQUIRED(5005, "Phần trăm giảm giá là bắt buộc", HttpStatus.BAD_REQUEST),
    VOUCHER_DISCOUNT_MUST_BE_POSITIVE(5006, "Số tiền giảm phải lớn hơn 0", HttpStatus.BAD_REQUEST),
    VOUCHER_DISCOUNT_MUST_BE_AT_LEAST_1(5006, "Phần trăm giảm giá phải ít nhất là 1%", HttpStatus.BAD_REQUEST),
    VOUCHER_DISCOUNT_MUST_BE_LESS_THAN_100(5007, "Phần trăm giảm giá phải nhỏ hơn 100%", HttpStatus.BAD_REQUEST),
    VOUCHER_START_DATE_REQUIRED(5008, "Ngày bắt đầu của mã giảm giá là bắt buộc", HttpStatus.BAD_REQUEST),
    VOUCHER_START_DATE_MUST_BE_FUTURE_OR_PRESENT(5009, "Ngày bắt đầu phải là hiện tại hoặc tương lai", HttpStatus.BAD_REQUEST),
    VOUCHER_END_DATE_REQUIRED(5010, "Ngày kết thúc của mã giảm giá là bắt buộc", HttpStatus.BAD_REQUEST),
    VOUCHER_END_DATE_MUST_BE_IN_FUTURE(5011, "Ngày kết thúc phải nằm trong tương lai", HttpStatus.BAD_REQUEST),
    VOUCHER_MIN_PURCHASE_MUST_BE_ZERO_OR_POSITIVE(5012, "Số tiền mua tối thiểu phải là số không hoặc số dương", HttpStatus.BAD_REQUEST),
    
    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
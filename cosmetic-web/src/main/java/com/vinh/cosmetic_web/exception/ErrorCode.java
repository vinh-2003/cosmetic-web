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

    CATEGORY_NOT_EXISTED(2002, "Danh mục không tồn tại", HttpStatus.NOT_FOUND),
    CATEGORY_NAME_REQUIRED(2003, "Tên danh mục không được để trống", HttpStatus.BAD_REQUEST),
    CATEGORY_NAME_TOO_LONG(2004, "Tên danh mục không được vượt quá 100 ký tự", HttpStatus.BAD_REQUEST),

    BANNER_NOT_EXISTED(3002, "Banner không tồn tại", HttpStatus.NOT_FOUND),
    BANNER_START_DATE_REQUIRED(3003, "Ngày bắt đầu không được để trống", HttpStatus.BAD_REQUEST),
    BANNER_START_DATE_MUST_BE_FUTURE_OR_PRESENT(3004, "Ngày bắt đầu phải là hiện tại hoặc tương lai", HttpStatus.BAD_REQUEST),
    BANNER_END_DATE_REQUIRED(3005, "Ngày kết thúc không được để trống", HttpStatus.BAD_REQUEST),
    BANNER_END_DATE_MUST_BE_IN_FUTURE(3006, "Ngày kết thúc phải nằm trong tương lai", HttpStatus.BAD_REQUEST),

    PRODUCT_NOT_EXISTED(4002, "Sản phẩm không tồn tại", HttpStatus.NOT_FOUND),
    PRODUCT_NAME_REQUIRED(4003, "Tên sản phẩm không được để trống", HttpStatus.BAD_REQUEST),
    PRODUCT_NAME_TOO_LONG(4004, "Tên sản phẩm không được vượt quá 255 ký tự", HttpStatus.BAD_REQUEST),
    PRODUCT_PRICE_REQUIRED(4005, "Giá sản phẩm không được để trống", HttpStatus.BAD_REQUEST),
    PRODUCT_PRICE_MUST_BE_POSITIVE(4006, "Giá sản phẩm phải là số dương", HttpStatus.BAD_REQUEST),
    PRODUCT_STOCK_QUANTITY_REQUIRED(4007, "Số lượng sản phẩm không được để trống", HttpStatus.BAD_REQUEST),
    PRODUCT_STOCK_QUANTITY_MUST_BE_POSITIVE(4008, "Số lượng sản phẩm phải là số dương", HttpStatus.BAD_REQUEST),
    CATEGORY_REQUIRED(4009, "Danh mục không được để trống", HttpStatus.BAD_REQUEST),
    PRODUCT_BRAND_REQUIRED(4010, "Thương hiệu sản phẩm không được để trống", HttpStatus.BAD_REQUEST),
    PRODUCT_BRAND_TOO_LONG(4011, "Thương hiệu sản phẩm không được vượt quá 100 ký tự", HttpStatus.BAD_REQUEST),
    PRODUCT_DISCOUNT_PERCENTAGE_MUST_BE_POSITIVE(4012, "Phần trăm giảm giá phải là số dương", HttpStatus.BAD_REQUEST),
    PRODUCT_DISCOUNT_PERCENTAGE_TOO_HIGH(4013, "Phần trăm giảm giá không được vượt quá 100%", HttpStatus.BAD_REQUEST),

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
    VOUCHER_USAGE_LIMIT_MUST_BE_POSITIVE(5013, "Giới hạn số lần sử dụng phải là số dương", HttpStatus.BAD_REQUEST),
    VOUCHER_ID_REQUIRED(5014, "Id mã giảm giá là bắt buộc", HttpStatus.BAD_REQUEST),
    VOUCHER_CODE_NOT_EXISTED(5015, "Mã giảm giá không tồn tại", HttpStatus.BAD_REQUEST),
    VOUCHER_NOT_ENABLED(5016, "Mã giảm giá không có sẵn", HttpStatus.BAD_REQUEST),
    VOUCHER_NOT_STARTED_YET(5017, "Thời gian sử dụng mã giảm giá không hợp lệ", HttpStatus.BAD_REQUEST),
    VOUCHER_EXPIRED(5018, "Mã giảm giá đã hết hạn", HttpStatus.BAD_REQUEST),
    ORDER_TOTAL_TOO_LOW(5019, "Tổng đơn hàng nhỏ hơn mức tối thiểu để sử dụng", HttpStatus.BAD_REQUEST),
    VOUCHER_USAGE_LIMIT_REACHED(5020, "Mã giảm giá hết lượt sử dụng", HttpStatus.BAD_REQUEST),

    SHIPPING_ADDRESS_NOT_EXISTED(6002, "Địa chỉ giao hàng không tồn tại", HttpStatus.NOT_FOUND),
    SHIPPING_ADDRESS_ID_REQUIRED(6003, "Id địa chỉ nhận hàng là bắt buộc", HttpStatus.BAD_REQUEST),

    CART_ITEM_NOT_EXISTED(7002, "Sản phẩm trong giỏ hàng không tồn tại", HttpStatus.NOT_FOUND),
    CART_ITEM_QUANTITY_INVALID(7003, "Số lượng không hợp lệ", HttpStatus.BAD_REQUEST),
    CART_ITEM_ID_REQUIRED(7004, "Mã sản phẩm trong giỏ hàng bắt buộc phải có", HttpStatus.BAD_REQUEST),
    QUANTITY_REQUIRED(7005, "Số lượng không được trống", HttpStatus.BAD_REQUEST),
    QUANTITY_MUST_BE_POSITIVE(7006, "Số lượng phải lớn hơn 1", HttpStatus.BAD_REQUEST),

    RECIPIENT_NAME_REQUIRED(8002, "Tên người nhận là bắt buộc", HttpStatus.BAD_REQUEST),
    RECIPIENT_NAME_TOO_LONG(8003, "Tên người nhận quá dài", HttpStatus.BAD_REQUEST),
    RECIPIENT_PHONE_REQUIRED(8004, "Số điện thoại người nhận là bắt buộc", HttpStatus.BAD_REQUEST),
    RECIPIENT_PHONE_INVALID(8005, "Số điện thoại người nhận không hợp lệ", HttpStatus.BAD_REQUEST),
    RECIPIENT_ADDRESS_REQUIRED(8006, "Địa chỉ người nhận là bắt buộc", HttpStatus.BAD_REQUEST),
    RECIPIENT_ADDRESS_TOO_LONG(8007, "Địa chỉ người nhận quá dài", HttpStatus.BAD_REQUEST),
    NO_SHIPPING_ADDRESS_YET(8008, "Không có địa chỉ nhận hàng", HttpStatus.BAD_REQUEST),

    CART_EMPTY(9002, "Giỏ hàng trống", HttpStatus.BAD_REQUEST),

    ORDER_NOT_EXISTED(10002, "Đơn hàng không tồn tại", HttpStatus.NOT_FOUND),
    PRODUCT_QUANTITY_NO_ENOUGH(8008, "Số lượng sản phẩm trong kho không đủ", HttpStatus.BAD_REQUEST),

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
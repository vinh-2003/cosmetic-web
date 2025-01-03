package com.vinh.cosmetic_web.service;

import com.vinh.cosmetic_web.dto.request.VoucherOrderRequest;
import com.vinh.cosmetic_web.dto.response.OrderResponse;
import com.vinh.cosmetic_web.dto.response.VoucherOrderResponse;
import com.vinh.cosmetic_web.entity.*;
import com.vinh.cosmetic_web.exception.AppException;
import com.vinh.cosmetic_web.exception.ErrorCode;
import com.vinh.cosmetic_web.mapper.OrderMapper;
import com.vinh.cosmetic_web.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OrderService {
    private final ProductRepository productRepository;
    OrderRepository orderRepository;
    UserRepository userRepository;
    ShippingAddressRepository shippingAddressRepository;
    OrderStatusRepository orderStatusRepository;
    OrderItemRepository orderItemRepository;
    OrderMapper orderMapper;
    VoucherRepository voucherRepository;
    CartService cartService;

    @PreAuthorize("hasRole('USER')")
    @Transactional
    public OrderResponse createOrder() {
        var context = SecurityContextHolder.getContext();
        var username = context.getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Cart cart = user.getCart();

        Long total = cart.calculateTotal();

        OrderStatus orderStatus = OrderStatus.builder()
                .status("Đang tạo")
                .build();
        orderStatusRepository.save(orderStatus);

        ShippingAddress shippingAddress = shippingAddressRepository.findFirstByUserAndEnabled(user, true);
        log.info("Shipping address {}", shippingAddress);
        if (shippingAddress == null) throw new AppException(ErrorCode.NO_SHIPPING_ADDRESS_YET);

        Order order = Order.builder()
                .user(user)
                .total(total)
                .currentStatus(orderStatus)
                .shippingAddress(shippingAddress)
                .build();

        orderRepository.save(order);

        orderStatus.setOrder(order);
        orderStatusRepository.save(orderStatus);

        if (cart.getCartItems().isEmpty()) throw new AppException(ErrorCode.CART_EMPTY);
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(cartItem.getProduct())
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getPrice())
                    .build();
            orderItems.add(orderItem);
            orderItemRepository.save(orderItem);
        }

        order.setOrderItems(orderItems);
        orderRepository.save(order);

        return orderMapper.toOrderResponse(order);
    }

    @PreAuthorize("hasRole('USER')")
    @Transactional
    public OrderResponse updateOrder(String orderId, String shippingAddressId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));
        ShippingAddress shippingAddress = shippingAddressRepository.findById(shippingAddressId).orElseThrow(() -> new AppException(ErrorCode.SHIPPING_ADDRESS_NOT_EXISTED));

        order.setShippingAddress(shippingAddress);

        return orderMapper.toOrderResponse(orderRepository.save(order));
    }

    @PreAuthorize("hasRole('USER')")
    @Transactional
    public void deleteOrder(String orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));
        OrderStatus orderStatus = order.getCurrentStatus();
        orderStatus.setOrder(null);
        orderStatusRepository.save(orderStatus);

        List<OrderItem> orderItems = order.getOrderItems();
        for (OrderItem orderItem : orderItems) {
            orderItemRepository.delete(orderItem);
        }

//        Voucher voucher = order.getVoucher();
//        if (voucher != null) {
//            voucher.setUsageLimit(voucher.getUsageLimit() + 1);
//            voucherRepository.save(voucher);
//        }

        orderRepository.deleteById(orderId);

        orderStatusRepository.delete(orderStatus);
    }

    @PreAuthorize("hasRole('USER')")
    public OrderResponse getOrder(String orderId) {
        return orderMapper.toOrderResponse(orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED)));
    }

    @PreAuthorize("hasRole('USER')")
    @Transactional
    public void updateOrderStatusForOrder(String orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));

        OrderStatus orderStatus = OrderStatus.builder()
                .status("Đã thanh toán")
                .build();
        orderStatusRepository.save(orderStatus);

        for (OrderItem orderItem : order.getOrderItems()) {
            Product product = orderItem.getProduct();
            int orderedQuantity = orderItem.getQuantity();
            int newStockQuantity = product.getStockQuantity() - orderedQuantity;

            if (newStockQuantity < 0) {
                throw new AppException(ErrorCode.PRODUCT_QUANTITY_NO_ENOUGH);
            }

            product.setStockQuantity(newStockQuantity);
            productRepository.save(product);
        }

        cartService.clearCart();

        Voucher voucher = order.getVoucher();
        if (voucher != null) {
            voucher.setUsageLimit(voucher.getUsageLimit() - 1);
            voucherRepository.save(voucher);
        }

        order.setCurrentStatus(orderStatus);
        orderRepository.save(order);

        orderStatus.setOrder(order);
        orderStatusRepository.save(orderStatus);
    }

    @PreAuthorize("hasRole('USER')")
    public VoucherOrderResponse applyVoucherToOrder(VoucherOrderRequest request) {
        // Tìm đơn hàng theo orderId
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED)); // Thêm lỗi nếu không tìm thấy đơn hàng

        long total = 0L;
        for (OrderItem orderItem : order.getOrderItems()) {
            total += orderItem.getPrice() * orderItem.getQuantity();
        }
        order.setTotal(total);
        order.setVoucher(null);

        // Kiểm tra voucher với mã code
        Optional<Voucher> result = voucherRepository.findByCode(request.getCode());
        Voucher voucher;

        if (result.isPresent()) {
            voucher = result.get();

        } else {
            order.setVoucher(null);
            orderRepository.save(order);
            throw new AppException(ErrorCode.VOUCHER_CODE_NOT_EXISTED); // Nếu không tìm thấy voucher, throw lỗi
        }

        // Kiểm tra xem voucher có hợp lệ hay không
        if (!voucher.getEnabled()) {
            order.setVoucher(null);
            orderRepository.save(order);
            throw new AppException(ErrorCode.VOUCHER_NOT_ENABLED); // Voucher không còn hoạt động
        }

        if (voucher.getStartDate().isAfter(LocalDateTime.now())) {
            order.setVoucher(null);
            orderRepository.save(order);
            throw new AppException(ErrorCode.VOUCHER_NOT_STARTED_YET); // Voucher chưa bắt đầu
        }

        if (voucher.getEndDate().isBefore(LocalDateTime.now())) {
            order.setVoucher(null);
            orderRepository.save(order);
            throw new AppException(ErrorCode.VOUCHER_EXPIRED); // Voucher đã hết hạn
        }

        if (voucher.getMinPurchase() > order.getTotal()) {
            order.setVoucher(null);
            orderRepository.save(order);
            throw new AppException(ErrorCode.ORDER_TOTAL_TOO_LOW); // Tổng đơn hàng nhỏ hơn mức tối thiểu của voucher
        }

        // Kiểm tra giới hạn sử dụng của voucher
        if (voucher.getUsageLimit() <= 0) {
            order.setVoucher(null);
            orderRepository.save(order);
            throw new AppException(ErrorCode.VOUCHER_USAGE_LIMIT_REACHED); // Voucher đã hết lượt sử dụng
        }



        // Cập nhật lại tổng đơn hàng sau khi áp dụng voucher
        order.setTotal(order.getTotal() - voucher.getDiscount());

        // Cập nhật voucher cho đơn hàng
        order.setVoucher(voucher);
        orderRepository.save(order);

        // Trả kết quả về client
        VoucherOrderResponse response = VoucherOrderResponse.builder()
                .orderId(order.getOrderId())
                .discount(voucher.getDiscount())
                .totalAmount(order.getTotal())
                .message("Áp dụng mã giảm " + voucher.getDiscount() + " VNĐ thành công")
                .status("success")
                .build();

        return response;
    }

    @PreAuthorize("hasRole('USER')")
    public List<OrderResponse> getOrders() {
        var context = SecurityContextHolder.getContext();
        var username = context.getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return orderRepository.findByUserOrderByCreatedAtDesc(user).stream().map(orderMapper::toOrderResponse).toList();
    }

    @PreAuthorize("hasRole('USER')")
    public List<OrderResponse> getOrders(String orderId) {
        var context = SecurityContextHolder.getContext();
        var username = context.getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return orderRepository.findByUserAndOrderIdContainingIgnoreCaseOrderByCreatedAtDesc(user, orderId).stream().map(orderMapper::toOrderResponse).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<OrderResponse> getOrdersForAdmin() {

        return orderRepository.findByOrderByCreatedAtDesc().stream().map(orderMapper::toOrderResponse).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<OrderResponse> getOrdersForAdmin(String orderId) {

        return orderRepository.findByOrderIdContainingIgnoreCaseOrderByCreatedAtDesc(orderId).stream().map(orderMapper::toOrderResponse).toList();
    }
}

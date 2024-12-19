package com.vinh.cosmetic_web.service;

import com.vinh.cosmetic_web.dto.request.CartItemRequest;
import com.vinh.cosmetic_web.entity.Cart;
import com.vinh.cosmetic_web.entity.CartItem;
import com.vinh.cosmetic_web.entity.Product;
import com.vinh.cosmetic_web.entity.User;
import com.vinh.cosmetic_web.exception.AppException;
import com.vinh.cosmetic_web.exception.ErrorCode;
import com.vinh.cosmetic_web.repository.CartItemRepository;
import com.vinh.cosmetic_web.repository.ProductRepository;
import com.vinh.cosmetic_web.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartItemService {
    CartItemRepository cartItemRepository;
    UserRepository userRepository;
    ProductRepository productRepository;

    public void addProductToCart(CartItemRequest request) {
        // Tìm giỏ hàng của người dùng hiện tại
        var context = SecurityContextHolder.getContext();
        var username = context.getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Cart cart = user.getCart();

        // Lấy sản phẩm từ kho
        Product product = productRepository.findById(request.getProductId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

        // Tìm CartItem dựa trên giỏ hàng và sản phẩm
        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product);

        if (cartItem != null) {
            // Nếu sản phẩm đã có trong giỏ, tăng số lượng
            cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
        } else {
            // Nếu chưa có, tạo CartItem mới và thêm vào giỏ hàng
            cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .price(product.getPrice() * (100 - product.getDiscountPercentage()) / 100)
                    .build();
        }
        cartItemRepository.save(cartItem);
    }

    public void removeCartItem(String cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    public void updateCartItemsPrice(Product product) {
        // Tìm tất cả các CartItem có liên quan đến sản phẩm
        List<CartItem> cartItems = cartItemRepository.findByProduct(product);

        // Tính giá mới sau khi áp dụng giảm giá
        Long newDiscountedPrice = product.getPrice() * (100 - product.getDiscountPercentage()) / 100;

        // Cập nhật giá mới cho từng CartItem
        for (CartItem cartItem : cartItems) {
            cartItem.setPrice(newDiscountedPrice);
            cartItemRepository.save(cartItem);  // Lưu thay đổi vào cơ sở dữ liệu
        }
    }
}

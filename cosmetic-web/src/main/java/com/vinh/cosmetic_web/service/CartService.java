package com.vinh.cosmetic_web.service;

import com.vinh.cosmetic_web.entity.Cart;
import com.vinh.cosmetic_web.entity.CartItem;
import com.vinh.cosmetic_web.entity.User;
import com.vinh.cosmetic_web.exception.AppException;
import com.vinh.cosmetic_web.exception.ErrorCode;
import com.vinh.cosmetic_web.repository.CartItemRepository;
import com.vinh.cosmetic_web.repository.CartRepository;
import com.vinh.cosmetic_web.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartService {
    UserRepository userRepository;
    CartItemRepository cartItemRepository;

    public void clearCart() {
        var context = SecurityContextHolder.getContext();
        var username = context.getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Cart cart = user.getCart();

        for (CartItem cartItem : cart.getCartItems()) {
            cartItemRepository.delete(cartItem);
        }
    }
}

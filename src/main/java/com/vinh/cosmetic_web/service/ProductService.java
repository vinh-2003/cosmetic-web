package com.vinh.cosmetic_web.service;

import com.vinh.cosmetic_web.dto.request.ProductRequest;
import com.vinh.cosmetic_web.dto.response.ProductResponse;
import com.vinh.cosmetic_web.entity.Category;
import com.vinh.cosmetic_web.entity.Product;
import com.vinh.cosmetic_web.exception.AppException;
import com.vinh.cosmetic_web.exception.ErrorCode;
import com.vinh.cosmetic_web.mapper.ProductMapper;
import com.vinh.cosmetic_web.repository.CategoryRepository;
import com.vinh.cosmetic_web.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProductService {
    ProductRepository productRepository;
    CloudinaryService cloudinaryService;
    ProductMapper productMapper;
    CategoryRepository categoryRepository;
    CartItemService cartItemService;

    public List<ProductResponse> getProducts() {
        return productRepository.findByEnabled(true).stream().map(productMapper::toProductResponse).toList();
    }

    public List<ProductResponse> getProducts(String name, String categoryId) {
        if (name != null) {
            return productRepository.findByNameContainingIgnoreCaseAndEnabled(name, true).stream().map(productMapper::toProductResponse).toList();
        }
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new AppException((ErrorCode.CATEGORY_NOT_EXISTED)));
        return productRepository.findByCategoryAndEnabled(category, true).stream().map(productMapper::toProductResponse).toList();
    }

    public ProductResponse getProduct(String productId) {
        return productMapper.toProductResponse(productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED)));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public void deleteProduct(String productId) {
        productRepository.deleteById(productId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public void disableProduct(String productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

        product.setEnabled(false);

        productRepository.save(product);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public ProductResponse saveProduct(ProductRequest request, MultipartFile file) {
        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));

        Product product = productMapper.toProduct(request);
        product.setCategory(category);
        if (file != null) {
            try {
                String imageUrl = cloudinaryService.uploadFile(file);
                product.setImageUrl(imageUrl);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return productMapper.toProductResponse(productRepository.save(product));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public ProductResponse updateProduct(String productId, ProductRequest request, MultipartFile file) {
        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));

        Product product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

        productMapper.updateProduct(product, request);
        product.setCategory(category);
        if (file != null) {
            try {
                String imageUrl = cloudinaryService.uploadFile(file);
                product.setImageUrl(imageUrl);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        productRepository.save(product);

        cartItemService.updateCartItemsPrice(product);

        return productMapper.toProductResponse(product);
    }
}

package com.vinh.cosmetic_web.service;

import com.vinh.cosmetic_web.dto.request.ProductRequest;
import com.vinh.cosmetic_web.dto.response.ProductResponse;
import com.vinh.cosmetic_web.entity.Category;
import com.vinh.cosmetic_web.entity.Product;
import com.vinh.cosmetic_web.exception.AppException;
import com.vinh.cosmetic_web.exception.ErrorCode;
import com.vinh.cosmetic_web.mapper.ProductMapper;
import com.vinh.cosmetic_web.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
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

    public List<ProductResponse> getProducts() {
        return productRepository.findAll().stream().map(productMapper::toProductResponse).toList();
    }

    public ProductResponse getProduct(String productId) {
        return productMapper.toProductResponse(productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED)));
    }

    public void deleteProduct(String productId) {
        productRepository.deleteById(productId);
    }

    public void disableProduct(String productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

        product.setEnabled(false);

        productRepository.save(product);
    }

    public ProductResponse saveProduct(ProductRequest request, MultipartFile file) {
        Product product = productMapper.toProduct(request);
        if (!file.isEmpty()) {
            try {
                String imageUrl = cloudinaryService.uploadFile(file);
                product.setImageUrl(imageUrl);
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else if (product.getProductId() != null) {
            Product existingProduct = productRepository.findById(product.getProductId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));
            if (existingProduct != null) {
                product.setImageUrl(existingProduct.getImageUrl());
            }
        }
        return productMapper.toProductResponse(productRepository.save(product));
    }

    public List<ProductResponse> getProductByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name).stream().map(productMapper::toProductResponse).toList();
    }
}

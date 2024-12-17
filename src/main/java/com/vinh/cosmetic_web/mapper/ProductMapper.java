package com.vinh.cosmetic_web.mapper;

import com.vinh.cosmetic_web.dto.request.ProductRequest;
import com.vinh.cosmetic_web.dto.response.ProductResponse;
import com.vinh.cosmetic_web.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toProduct(ProductRequest request);

    ProductResponse toProductResponse(Product product);

    void updateProduct(@MappingTarget Product product, ProductRequest request);
}

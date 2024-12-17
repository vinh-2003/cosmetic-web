package com.vinh.cosmetic_web.mapper;

import com.vinh.cosmetic_web.dto.request.CategoryRequest;
import com.vinh.cosmetic_web.dto.response.CategoryResponse;
import com.vinh.cosmetic_web.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCategory(CategoryRequest request);

    CategoryResponse toCategoryResponse(Category category);

    void updateCategory(@MappingTarget Category category, CategoryRequest request);
}

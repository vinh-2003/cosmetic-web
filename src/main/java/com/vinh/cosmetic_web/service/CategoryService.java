package com.vinh.cosmetic_web.service;

import com.vinh.cosmetic_web.dto.request.CategoryRequest;
import com.vinh.cosmetic_web.dto.response.CategoryResponse;
import com.vinh.cosmetic_web.entity.Category;
import com.vinh.cosmetic_web.exception.AppException;
import com.vinh.cosmetic_web.exception.ErrorCode;
import com.vinh.cosmetic_web.mapper.CategoryMapper;
import com.vinh.cosmetic_web.repository.CategoryRepository;
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
public class CategoryService {
    CategoryRepository categoryRepository;
    CloudinaryService cloudinaryService;
    CategoryMapper categoryMapper;

    public List<CategoryResponse> getCategories() {
        return categoryRepository.findByEnabled(true).stream().map(categoryMapper::toCategoryResponse).toList();
    }

    public List<CategoryResponse> getCategories(String name) {
        return categoryRepository.findByNameContainingIgnoreCaseAndEnabled(name, true).stream().map(categoryMapper::toCategoryResponse).toList();
    }

    public CategoryResponse getCategory(String categoryId) {
        return categoryMapper.toCategoryResponse(categoryRepository.findById(categoryId).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED)));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public void deleteCategory(String categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public void disableCategory(String categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));

        category.setEnabled(false);

        categoryRepository.save(category);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public CategoryResponse saveCategory(CategoryRequest request, MultipartFile file) {
        Category category = categoryMapper.toCategory(request);

        if (file != null) {
            try {
                String imageUrl = cloudinaryService.uploadFile(file);
                category.setImageUrl(imageUrl);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public CategoryResponse updateCategory(String categoryId, CategoryRequest request, MultipartFile file) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));

        categoryMapper.updateCategory(category, request);

        if (file != null) {
            try {
                String imageUrl = cloudinaryService.uploadFile(file);
                category.setImageUrl(imageUrl);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }
}

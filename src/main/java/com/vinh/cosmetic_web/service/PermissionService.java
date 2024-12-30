package com.vinh.cosmetic_web.service;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.vinh.cosmetic_web.dto.request.PermissionRequest;
import com.vinh.cosmetic_web.dto.response.PermissionResponse;
import com.vinh.cosmetic_web.entity.Permission;
import com.vinh.cosmetic_web.mapper.PermissionMapper;
import com.vinh.cosmetic_web.repository.PermissionRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionService {
    PermissionRepository permissionRepository;
    PermissionMapper permissionMapper;

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public PermissionResponse create(PermissionRequest request) {
        Permission permission = permissionMapper.toPermission(request);
        permission = permissionRepository.save(permission);
        return permissionMapper.toPermissionResponse(permission);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<PermissionResponse> getAll() {
        var permissions = permissionRepository.findAll();
        return permissions.stream().map(permissionMapper::toPermissionResponse).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public void delete(String permission) {
        permissionRepository.deleteById(permission);
    }
}
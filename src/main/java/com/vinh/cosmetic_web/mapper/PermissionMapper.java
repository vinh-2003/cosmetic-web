package com.vinh.cosmetic_web.mapper;

import com.vinh.cosmetic_web.dto.request.PermissionRequest;
import com.vinh.cosmetic_web.dto.response.PermissionResponse;
import com.vinh.cosmetic_web.entity.Permission;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);
}
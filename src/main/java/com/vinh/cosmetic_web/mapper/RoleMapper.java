package com.vinh.cosmetic_web.mapper;

import com.vinh.cosmetic_web.dto.request.RoleRequest;
import com.vinh.cosmetic_web.dto.response.RoleResponse;
import com.vinh.cosmetic_web.entity.Role;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);

    RoleResponse toRoleResponse(Role role);
}
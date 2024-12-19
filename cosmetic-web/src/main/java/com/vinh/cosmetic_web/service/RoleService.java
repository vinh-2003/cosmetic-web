package com.vinh.cosmetic_web.service;

import java.util.HashSet;
import java.util.List;

import org.springframework.stereotype.Service;

import com.vinh.cosmetic_web.dto.request.RoleRequest;
import com.vinh.cosmetic_web.dto.response.RoleResponse;
import com.vinh.cosmetic_web.mapper.RoleMapper;
import com.vinh.cosmetic_web.repository.PermissionRepository;
import com.vinh.cosmetic_web.repository.RoleRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {
    RoleRepository roleRepository;
    PermissionRepository permissionRepository;
    RoleMapper roleMapper;

    public RoleResponse create(RoleRequest request) {
        var role = roleMapper.toRole(request);

        var permissions = permissionRepository.findAllById(request.getPermissions());
        role.setPermissions(new HashSet<>(permissions));

        role = roleRepository.save(role);
        return roleMapper.toRoleResponse(role);
    }

    public List<RoleResponse> getAll() {
        return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
    }

    public void delete(String role) {
        roleRepository.deleteById(role);
    }
}
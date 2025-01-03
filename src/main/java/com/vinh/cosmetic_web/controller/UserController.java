package com.vinh.cosmetic_web.controller;

import java.util.List;

import com.vinh.cosmetic_web.dto.request.PasswordUpdateRequest;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.vinh.cosmetic_web.dto.ApiResponse;
import com.vinh.cosmetic_web.dto.request.UserCreationRequest;
import com.vinh.cosmetic_web.dto.request.UserUpdateRequest;
import com.vinh.cosmetic_web.dto.response.UserResponse;
import com.vinh.cosmetic_web.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserController {
    UserService userService;

    @PostMapping
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<UserResponse>> getUsers(@RequestParam(value = "username", required = false) String username) {
        if (username != null) {
            return ApiResponse.<List<UserResponse>>builder()
                    .result(userService.getUsers(username))
                    .build();
        }
        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getUsers())
                .build();
    }

    @GetMapping("/{userId}")
    ApiResponse<UserResponse> getUser(@PathVariable("userId") String userId) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUser(userId))
                .build();
    }

    @GetMapping("/my-info")
    ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }

    @DeleteMapping("/{userId}")
    ApiResponse<String> deleteUser(@PathVariable String userId) {
        userService.disableUser(userId);
        return ApiResponse.<String>builder().result("User has been deleted").build();
    }

    @PutMapping("/{userId}")
    ApiResponse<UserResponse> updateUser(@PathVariable String userId, @RequestBody @Valid UserUpdateRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.updateUser(userId, request))
                .build();
    }

    @PutMapping
    ApiResponse<Void> updatePassword(@RequestBody @Valid PasswordUpdateRequest request) {
        userService.updatePassword(request);
        return ApiResponse.<Void>builder().build();
    }
}
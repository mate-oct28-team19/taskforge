package com.example.taskforge.dto.user;

public record UserRegistrationResponseDto(String token, int code, String colorScheme, String language) {
}

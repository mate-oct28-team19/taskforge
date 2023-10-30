package com.example.taskforge.security;

import
import com.example.taskforge.dto.UserRegistrationRequestDto;
import com.example.taskforge.dto.UserResponseDto;

public interface AuthenticationService {

    UserResponseDto register(UserRegistrationRequestDto requestDto) throws RegistrationException;
}

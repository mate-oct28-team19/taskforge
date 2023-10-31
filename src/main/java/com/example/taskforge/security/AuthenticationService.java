package com.example.taskforge.security;

import com.example.taskforge.dto.UserLoginRequestDto;
import com.example.taskforge.dto.UserLoginResponseDto;
import com.example.taskforge.dto.UserRegistrationRequestDto;
import com.example.taskforge.dto.UserResponseDto;
import com.example.taskforge.exception.RegistrationException;

public interface AuthenticationService {

    UserResponseDto register(UserRegistrationRequestDto requestDto) throws RegistrationException;

    UserLoginResponseDto authenticate(UserLoginRequestDto request);
}

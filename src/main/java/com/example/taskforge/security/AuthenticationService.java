package com.example.taskforge.security;

import com.example.taskforge.dto.UserRegistrationRequestDto;
import com.example.taskforge.dto.UserResponseDto;
import com.example.taskforge.exception.RegistrationException;

public interface AuthenticationService {

    UserResponseDto register(UserRegistrationRequestDto requestDto) throws RegistrationException;
}

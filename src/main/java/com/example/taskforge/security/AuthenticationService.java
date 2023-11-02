package com.example.taskforge.security;

import com.example.taskforge.dto.ConfirmationTokenResponseDto;
import com.example.taskforge.dto.user.UserLoginRequestDto;
import com.example.taskforge.dto.user.UserLoginResponseDto;
import com.example.taskforge.dto.user.UserRegistrationRequestDto;
import com.example.taskforge.exception.RegistrationException;

public interface AuthenticationService {

    ConfirmationTokenResponseDto register(UserRegistrationRequestDto requestDto)
            throws RegistrationException;

    UserLoginResponseDto authenticate(UserLoginRequestDto request);
}

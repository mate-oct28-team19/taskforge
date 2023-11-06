package com.example.taskforge.security;

import com.example.taskforge.dto.user.UserLoginRequestDto;
import com.example.taskforge.dto.user.UserLoginResponseDto;
import com.example.taskforge.dto.user.UserRegistrationRequestDto;
import com.example.taskforge.dto.user.UserRegistrationResponseDto;
import com.example.taskforge.exception.RegistrationException;

public interface AuthenticationService {

    UserRegistrationResponseDto register(UserRegistrationRequestDto requestDto)
            throws RegistrationException;

    UserLoginResponseDto authenticate(UserLoginRequestDto request) throws RegistrationException;

    String confirmRegistrationToken(String token) throws RegistrationException;

    UserRegistrationResponseDto resend(String token) throws RegistrationException;

    void enableUser(String token) throws RegistrationException;
}

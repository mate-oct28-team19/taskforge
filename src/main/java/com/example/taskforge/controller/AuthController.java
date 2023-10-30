package com.example.taskforge.controller;

import com.example.taskforge.dto.UserRegistrationRequestDto;
import com.example.taskforge.dto.UserResponseDto;
import com.example.taskforge.exception.RegistrationException;
import com.example.taskforge.security.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public UserResponseDto register(
            @RequestBody @Valid UserRegistrationRequestDto registrationRequest)
            throws RegistrationException {
        return authenticationService.register(registrationRequest);

    }
}

package com.example.taskforge.controller;

import com.example.taskforge.dto.user.UserLoginRequestDto;
import com.example.taskforge.dto.user.UserLoginResponseDto;
import com.example.taskforge.dto.user.UserRegistrationRequestDto;
import com.example.taskforge.dto.user.UserRegistrationResponseDto;
import com.example.taskforge.exception.RegistrationException;
import com.example.taskforge.security.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Authentication management", description = "Endpoints to register and authentication")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;

    @Operation(summary = "Login", description = "Login into the system")
    @PostMapping("/login")
    public UserLoginResponseDto login(@RequestBody UserLoginRequestDto requestDto)
            throws RegistrationException {
        return authenticationService.authenticate(requestDto);
    }

    @Operation(summary = "Register", description = "Register in the system")
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserRegistrationResponseDto register(
            @RequestBody @Valid UserRegistrationRequestDto registrationRequest)
            throws RegistrationException {
        return authenticationService.register(registrationRequest);
    }

    @Operation(summary = "Confirm registration",
            description = "Confirm registration via link from email")
    @GetMapping("/confirm")
    @ResponseStatus(HttpStatus.OK)
    public String confirm(@RequestParam("token") String token) throws RegistrationException {
        return authenticationService.confirmRegistrationToken(token);
    }

    @Operation(summary = "Regenerate & resend code",
            description = "Regenerates and resends confirmation code on email")
    @GetMapping("/resend")
    public UserRegistrationResponseDto resendCode(@RequestParam("token") String token)
            throws RegistrationException {
        return authenticationService.resend(token);
    }

    //  @PostMapping("/confirm")
    //  @ResponseStatus(HttpStatus.OK)
    //  public void confirmCode(@RequestParam String token) throws RegistrationException {
    //      authenticationService.enableUser(token);
    //  }
}

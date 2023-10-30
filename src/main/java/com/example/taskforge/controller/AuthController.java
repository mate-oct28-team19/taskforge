package com.example.taskforge.controller;

import com.example.taskforge.dto.UserRegistrationRequestDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @PostMapping("/register")
    public void register(@RequestBody @Valid UserRegistrationRequestDto registrationRequest) {

    }
}

package com.example.taskforge.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegistrationRequestDto {
    @Email
    @NotBlank
    @Size(max = 64)
    private String email;
    @NotBlank
    @Size(min = 8, max = 40)
    private String password;
    @NotBlank
    @Size(min = 8, max = 40)
    private String repeatPassword;
}

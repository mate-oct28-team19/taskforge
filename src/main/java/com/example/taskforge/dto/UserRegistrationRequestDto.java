package com.example.taskforge.dto;

import com.example.taskforge.validation.Email;
import com.example.taskforge.validation.FieldMatch;
import com.example.taskforge.validation.PasswordNotContainsEmail;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@FieldMatch
@PasswordNotContainsEmail
public class UserRegistrationRequestDto {
    @Email
    @NotNull
    @NotEmpty
    private String email;
    @NotNull
    @NotEmpty
    @Size(min = 8, max = 40, message = "password must have at least 8 symbols")
    private String password;
    @NotNull
    @NotEmpty
    private String repeatPassword;
}

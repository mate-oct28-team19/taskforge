package com.example.taskforge.dto;

import com.example.taskforge.validation.Email;
import com.example.taskforge.validation.FieldMatch;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@FieldMatch
public class UserRegistrationRequestDto {
    @Email
    @NotNull
    @NotEmpty
    private String email;
    @NotNull
    @NotEmpty
    @Size(min = 8, max = 40)
    private String password;
    @NotNull
    @NotEmpty
    @Size(min = 8, max = 40)
    private String repeatPassword;
}

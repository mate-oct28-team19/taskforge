package com.example.taskforge.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginRequestDto {
    @NotEmpty
    @Email
    @Size(min = 8, max = 64)
    private String email;
    @NotEmpty
    @Size(min = 8, max = 64)
    private String password;

    //todo: add validation according to requirements
}

package com.example.taskforge.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserRequestDto {
    private String email;
    private String password;
    private String language;
}

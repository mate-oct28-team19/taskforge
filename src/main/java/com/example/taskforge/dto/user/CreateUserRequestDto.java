package com.example.taskforge.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserRequestDto {
    private String email;
    private String password;
    private String language;
    private String colorScheme;
}

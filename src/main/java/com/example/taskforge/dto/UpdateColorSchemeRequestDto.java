package com.example.taskforge.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateColorSchemeRequestDto {
    @NotEmpty
    private String colorScheme;
}

package com.example.taskforge.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateColorSchemeRequestDto {
    @NotNull
    @NotEmpty
    private String colorScheme;
}

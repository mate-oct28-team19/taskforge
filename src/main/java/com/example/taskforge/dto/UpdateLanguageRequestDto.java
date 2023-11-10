package com.example.taskforge.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateLanguageRequestDto {
    @NotNull
    @NotEmpty
    private String language;
}

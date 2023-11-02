package com.example.taskforge.dto.task;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTaskRequestDto {
    @Min(5)
    @Max(254)
    private String title;
}

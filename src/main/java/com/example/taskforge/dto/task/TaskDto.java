package com.example.taskforge.dto.task;

import com.example.taskforge.model.Task;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskDto {
    @Min(5)
    @Max(254)
    private String title;
    @NotBlank
    private Task.Status status;
}

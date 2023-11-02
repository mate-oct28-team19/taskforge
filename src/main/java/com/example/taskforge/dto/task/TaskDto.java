package com.example.taskforge.dto.task;

import com.example.taskforge.model.Task;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskDto {
    private Long id;
    @Min(5)
    @Max(254)
    private String title;
    private Task.Status status;
}

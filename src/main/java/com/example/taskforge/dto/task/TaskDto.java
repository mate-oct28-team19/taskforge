package com.example.taskforge.dto.task;

import com.example.taskforge.model.Task;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskDto {
    private Long id;
    @Size(min = 5, max = 254)
    private String title;
    private Task.Status status;
}

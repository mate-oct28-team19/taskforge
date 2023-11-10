package com.example.taskforge.controller;

import com.example.taskforge.dto.task.CreateTaskRequestDto;
import com.example.taskforge.dto.task.TaskDto;
import com.example.taskforge.exception.EntityNotFoundException;
import com.example.taskforge.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Task management", description = "Endpoints for task management")
@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @Operation(summary = "Get all tasks", description = "Get all user's tasks ")
    @GetMapping
    public List<TaskDto> getAll(Pageable pageable, Authentication authentication) {
        return taskService.findAll(authentication.getName(), pageable);
    }

    @Operation(summary = "Create a new task", description = "Create a new task")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskDto createTask(@RequestBody @Valid CreateTaskRequestDto requestDto, Authentication authentication) {
        return taskService.save(authentication.getName(), requestDto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a task", description = "Update a task by id")
    public TaskDto updateTask(@PathVariable Long id, @RequestBody @Valid TaskDto taskDto, Authentication authentication) {
        return taskService.update(authentication.getName(), id, taskDto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a task", description = "Delete a task by id")
    public void deleteTask(@PathVariable Long id, Authentication authentication) {
        taskService.delete(authentication.getName(), id);
    }
}

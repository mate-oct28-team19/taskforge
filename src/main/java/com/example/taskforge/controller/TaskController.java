package com.example.taskforge.controller;

import com.example.taskforge.dto.task.CreateTaskRequestDto;
import com.example.taskforge.dto.task.TaskDto;
import com.example.taskforge.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
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
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<TaskDto> getAll(Authentication authentication) {
        return taskService.findAll(authentication.getName());
    }

    @Operation(summary = "Create a new task", description = "Create a new task")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public TaskDto createTask(@RequestBody @Valid CreateTaskRequestDto requestDto,
                              Authentication authentication) {
        return taskService.save(authentication.getName(), requestDto);
    }

    @Operation(summary = "Update a task", description = "Update a task by id")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public TaskDto updateTask(@PathVariable Long id, @RequestBody @Valid TaskDto taskDto,
                              Authentication authentication) {
        return taskService.update(authentication.getName(), id, taskDto);
    }

    @Operation(summary = "Delete a task", description = "Delete a task by id")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public void deleteTask(@PathVariable Long id, Authentication authentication) {
        taskService.delete(authentication.getName(), id);
    }
}

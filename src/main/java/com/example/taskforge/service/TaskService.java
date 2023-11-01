package com.example.taskforge.service;

import com.example.taskforge.dto.CreateUserRequestDto;
import com.example.taskforge.dto.task.CreateTaskRequestDto;
import com.example.taskforge.dto.task.TaskDto;
import com.example.taskforge.model.Task;
import com.example.taskforge.model.User;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TaskService {
    List<TaskDto> findAll(String email, Pageable pageable);

    TaskDto save(String email, CreateTaskRequestDto requestDto);

    TaskDto update(Long id, TaskDto taskDto);

    void delete(Long id);
}

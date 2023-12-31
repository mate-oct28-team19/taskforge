package com.example.taskforge.service;

import com.example.taskforge.dto.task.CreateTaskRequestDto;
import com.example.taskforge.dto.task.TaskDto;
import java.util.List;
import org.springframework.scheduling.annotation.Scheduled;

public interface TaskService {
    List<TaskDto> findAll(String email);

    TaskDto save(String email, CreateTaskRequestDto requestDto);

    TaskDto update(String email, Long id, TaskDto taskDto);

    void delete(String email, Long id);

    @Scheduled(cron = "0 0 1 * * *")
    void deleteOldTasks();
}

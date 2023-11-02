package com.example.taskforge.service;

import com.example.taskforge.dto.task.CreateTaskRequestDto;
import com.example.taskforge.dto.task.TaskDto;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;

public interface TaskService {
    List<TaskDto> findAll(String email, Pageable pageable);

    TaskDto save(String email, CreateTaskRequestDto requestDto);

    TaskDto update(Long id, TaskDto taskDto);

    void delete(Long id);

    @Scheduled(cron = "0 0 0 * * *")
    void deleteOldTasks();
}

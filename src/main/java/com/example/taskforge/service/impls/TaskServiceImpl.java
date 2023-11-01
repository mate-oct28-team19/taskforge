package com.example.taskforge.service.impls;

import com.example.taskforge.dto.task.CreateTaskRequestDto;
import com.example.taskforge.dto.task.TaskDto;
import com.example.taskforge.exception.EntityNotFoundException;
import com.example.taskforge.mapper.TaskMapper;
import com.example.taskforge.model.Task;
import com.example.taskforge.model.User;
import com.example.taskforge.repository.TaskRepository;
import com.example.taskforge.repository.UserRepository;
import com.example.taskforge.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {
    private final TaskMapper taskMapper;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    @Override
    public List<TaskDto> findAll(String email, Pageable pageable) {
        User user = getUserByEmail(email);
        Page<Task> allTasks = taskRepository.findAllByUserId(user.getId(), pageable);
        return allTasks.stream()
                .map(taskMapper::toDto)
                .toList();
    }

    @Override
    public TaskDto save(String email, CreateTaskRequestDto requestDto) {
        User user = getUserByEmail(email);
        Task task = new Task();
        task.setTitle(requestDto.getTitle());
        task.setUser(user);
        task.setStatus(Task.Status.TODO);
        task.setCreationDate(LocalDate.now());
        task.setDeletionDate(LocalDate.now().plusMonths(1));
        return taskMapper.toDto(taskRepository.save(task));
    }

    @Override
    public TaskDto update(Long id, TaskDto taskDto) {
        Task task = taskRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Can not find task by id:" + id));
        task.setTitle(taskDto.getTitle());
        task.setStatus(taskDto.getStatus());
        return taskMapper.toDto(taskRepository.save(task));
    }

    @Override
    public void delete(Long id) {
        taskRepository.deleteById(id);
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("Can not find user by email" + email));
    }
}

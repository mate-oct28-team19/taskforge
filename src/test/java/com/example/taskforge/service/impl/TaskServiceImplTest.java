package com.example.taskforge.service.impl;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.taskforge.dto.task.CreateTaskRequestDto;
import com.example.taskforge.dto.task.TaskDto;
import com.example.taskforge.exception.UnableToCreateTaskException;
import com.example.taskforge.mapper.TaskMapper;
import com.example.taskforge.model.Task;
import com.example.taskforge.model.User;
import com.example.taskforge.repository.TaskRepository;
import com.example.taskforge.repository.UserRepository;
import com.example.taskforge.service.impls.TaskServiceImpl;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;

@ExtendWith(MockitoExtension.class)
public class TaskServiceImplTest {
    private static final String EMAIL = "test@example.com";
    private static final String INVALID_EMAIL = "test23@example.com";
    @Mock
    private TaskMapper taskMapper;

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    private User user;
    private Task task;
    private TaskDto taskDto;
    private List<Task> tasks;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail(EMAIL);
        task = new Task();
        task.setId(1L);
        task.setUser(user);
        task.setTitle("Task");
        task.setStatus(Task.Status.DONE);
        task.setCreationDate(LocalDate.now());
        taskDto = new TaskDto();
        taskDto.setId(1L);
        taskDto.setTitle("Task");
        taskDto.setStatus(Task.Status.DONE);
        tasks = List.of(task);
    }

    @Test
    @DisplayName("Find all tasks by user's email")
    void testFindAll() {
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        when(taskRepository.findAllByUserId(user.getId())).thenReturn(tasks);
        when(taskMapper.toDto(task)).thenReturn(taskDto);
        List<TaskDto> result = taskService.findAll(EMAIL);
        assertEquals(1, result.size());
        assertEquals(taskDto, result.get(0));
    }

    @Test
    @DisplayName("Create a new task")
    void testSave_OK() {
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        when(taskRepository.findAllByUserId(user.getId())).thenReturn(List.of(new Task(), new Task()));
        CreateTaskRequestDto requestDto = new CreateTaskRequestDto();
        requestDto.setTitle("Task");
        when(taskMapper.toDto(any())).thenReturn(taskDto);
        TaskDto result = taskService.save(EMAIL, requestDto);
        assertEquals("Task", result.getTitle());
    }

    @Test
    @DisplayName("Not create a new task because user has more 20 tasks")
    void testSave_notOK_moreTwentyTasks() {
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        List<Task> spyList = spy(ArrayList.class);
        when(spyList.size()).thenReturn(20);
        when(taskRepository.findAllByUserId(user.getId())).thenReturn(spyList);
        CreateTaskRequestDto requestDto = new CreateTaskRequestDto();
        requestDto.setTitle("Task");
        Exception exception = assertThrows(UnableToCreateTaskException.class,
                () -> taskService.save(EMAIL, requestDto));
        String expected = "You mustn't create more 20 tasks.";
        String actual = exception.getMessage();
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Update a task")
    void testUpdate_OK_withValidUser() {
        taskDto.setTitle("Updated Task");
        taskDto.setStatus(Task.Status.DONE);
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        when(taskRepository.findById(task.getId())).thenReturn(Optional.of(task));
        when(taskRepository.save(task)).thenReturn(task);
        when(taskMapper.toDto(task)).thenReturn(taskDto);
        TaskDto result = taskService.update(EMAIL, task.getId(), taskDto);
        assertEquals("Updated Task", result.getTitle());
        assertEquals(Task.Status.DONE, result.getStatus());
    }

    @Test
    @DisplayName("Not update a task because user doesn't have access")
    void testUpdate_notOK_withInvalidUser() {
        User user2 = new User();
        user2.setId(2L);
        user2.setEmail(INVALID_EMAIL);
        taskDto.setTitle("Updated Task");
        taskDto.setStatus(Task.Status.DONE);
        when(userRepository.findByEmail(INVALID_EMAIL)).thenReturn(Optional.of(user2));
        when(taskRepository.findById(task.getId())).thenReturn(Optional.of(task));
        Exception exception = assertThrows(AccessDeniedException.class,
                () -> taskService.update(INVALID_EMAIL, task.getId(), taskDto));
        String expected = "User does not have permission to update task with id:" + task.getId();
        String actual = exception.getMessage();
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Delete a task")
    void testDelete_OK() {
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        when(taskRepository.findById(task.getId())).thenReturn(Optional.of(task));
        assertDoesNotThrow(() -> taskService.delete(EMAIL, task.getId()));
        verify(taskRepository, times(1)).deleteById(task.getId());
    }

    @Test
    @DisplayName("Not delete a task because user doesn't have access")
    void testDelete_notOK_withInvalidUser() {
        User user2 = new User();
        user2.setId(2L);
        user2.setEmail(INVALID_EMAIL);
        when(userRepository.findByEmail(INVALID_EMAIL)).thenReturn(Optional.of(user2));
        when(taskRepository.findById(task.getId())).thenReturn(Optional.of(task));
        Exception exception = assertThrows(AccessDeniedException.class,
                () -> taskService.delete(INVALID_EMAIL, task.getId()));
        String expected = "User does not have permission to delete task with id:" + task.getId();
        String actual = exception.getMessage();
        assertEquals(actual, expected);
        verify(taskRepository, times(0)).deleteById(task.getId());
    }

    @Test
    @DisplayName("Delete old tasks")
    void testDeleteOldTasks() {
        taskService.deleteOldTasks();
        verify(taskRepository, times(1)).deleteOldTasksWithStatusDone(any(LocalDate.class));
    }

}

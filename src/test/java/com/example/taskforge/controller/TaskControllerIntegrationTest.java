package com.example.taskforge.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.taskforge.dto.task.CreateTaskRequestDto;
import com.example.taskforge.dto.task.TaskDto;
import com.example.taskforge.model.Task;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TaskControllerIntegrationTest {
    protected static MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @BeforeAll
    static void beforeAll(@Autowired WebApplicationContext applicationContext) {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(applicationContext)
                .apply(springSecurity())
                .build();
    }

    @WithMockUser(username = "arsenbuter@gmail.com")
    @Test
    @DisplayName("Get all tasks")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void testGetAll_OK() throws Exception {
        TaskDto task1 = new TaskDto();
        task1.setId(1L);
        task1.setTitle("Task 1");
        task1.setStatus(Task.Status.IN_PROCESS);
        TaskDto task2 = new TaskDto();
        task2.setId(2L);
        task2.setTitle("Task 2");
        task2.setStatus(Task.Status.DONE);
        TaskDto task3 = new TaskDto();
        task3.setId(3L);
        task3.setTitle("Task 3");
        task3.setStatus(Task.Status.DONE);
        List<TaskDto> expected = List.of(task1, task2, task3);
        MvcResult result = mockMvc.perform(get("/tasks"))
                .andExpect(status().isOk())
                .andReturn();
        TaskDto[] actual = objectMapper.readValue(result
                .getResponse()
                .getContentAsString(), TaskDto[].class);
        assertEquals(expected, List.of(actual));
    }

    @WithMockUser(username = "test@gmail.com")
    @Test
    @DisplayName("Not get all tasks because user does not have an access")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void testGetAll_notOK_doesNotHaveAccess() throws Exception {
        mockMvc.perform(
                        get("/tasks"))
                .andExpect(status().is4xxClientError())
                .andReturn();
    }

    @WithMockUser(username = "arsenbuter@gmail.com")
    @Test
    @DisplayName("Create a new task")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void testCreateTask_OK() throws Exception {
        CreateTaskRequestDto requestDto = new CreateTaskRequestDto();
        requestDto.setTitle("Task 4");
        TaskDto expected = new TaskDto();
        expected.setTitle("Task 4");
        expected.setStatus(Task.Status.TODO);
        expected.setId(4L);
        String jsonRequest = objectMapper.writeValueAsString(requestDto);
        MvcResult result = mockMvc.perform(post("/tasks")
                        .content(jsonRequest)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andReturn();
        TaskDto actual = objectMapper.readValue(result.getResponse()
                .getContentAsString(), TaskDto.class);
        assertEquals(expected, actual);
    }

    @WithMockUser(username = "arsenbuter@gmail.com")
    @Test
    @DisplayName("Not create a new task because title less than 5 symbols")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void testCreateTask_notOK_smallTitle() throws Exception {
        CreateTaskRequestDto requestDto = new CreateTaskRequestDto();
        requestDto.setTitle("Task");
        String jsonRequest = objectMapper.writeValueAsString(requestDto);
        mockMvc.perform(post("/tasks")
                        .content(jsonRequest)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError())
                .andReturn();
    }

    @WithMockUser(username = "arsenbuter@gmail.com")
    @Test
    @DisplayName("Not create a new task because title more than 254 symbols")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void testCreateTask_notOK_bigTitle() throws Exception {
        CreateTaskRequestDto requestDto = new CreateTaskRequestDto();
        requestDto.setTitle("Taskiurrrrghghghghght4thrthhhhhhhhhhhh"
                + "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
                + "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
                + "hhhhhhhhhhgte44444444444444444444444444444444444gggggggggggggggg");
        String jsonRequest = objectMapper.writeValueAsString(requestDto);
        mockMvc.perform(post("/tasks")
                        .content(jsonRequest)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError())
                .andReturn();
    }

    @WithMockUser(username = "arsenbuter@gmail.com")
    @Test
    @DisplayName("Update a task")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void testUpdateTask_OK() throws Exception {
        TaskDto taskDto = new TaskDto();
        taskDto.setTitle("Update Task");
        taskDto.setStatus(Task.Status.IN_PROCESS);
        taskDto.setId(3L);
        TaskDto expected = new TaskDto();
        expected.setTitle("Update Task");
        expected.setStatus(Task.Status.IN_PROCESS);
        expected.setId(3L);
        String jsonRequest = objectMapper.writeValueAsString(taskDto);
        MvcResult result = mockMvc.perform(put("/tasks/{id}", taskDto.getId())
                        .content(jsonRequest)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        TaskDto actual = objectMapper.readValue(result.getResponse()
                .getContentAsString(), TaskDto.class);
        assertEquals(expected, actual);
    }

    @WithMockUser(username = "test@gmail.com")
    @Test
    @DisplayName("Not update a task because user does not have an access")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void testUpdateTask_notOK_doesNotNaveAccess() throws Exception {
        TaskDto taskDto = new TaskDto();
        taskDto.setTitle("Update Task");
        taskDto.setStatus(Task.Status.IN_PROCESS);
        taskDto.setId(3L);
        String jsonRequest = objectMapper.writeValueAsString(taskDto);
        mockMvc.perform(put("/tasks/{id}", taskDto.getId())
                        .content(jsonRequest)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError())
                .andReturn();
    }

    @WithMockUser(username = "arsenbuter@gmail.com")
    @Test
    @DisplayName("Not update a task because task's id is wrong")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void testUpdateTask_notOK_wrongTaskId() throws Exception {
        TaskDto taskDto = new TaskDto();
        taskDto.setTitle("Update Task");
        taskDto.setStatus(Task.Status.IN_PROCESS);
        taskDto.setId(3L);
        Long wrongId = 4L;
        String jsonRequest = objectMapper.writeValueAsString(taskDto);
        mockMvc.perform(put("/tasks/{id}", wrongId)
                        .content(jsonRequest)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError())
                .andReturn();
    }

    @WithMockUser(username = "arsenbuter@gmail.com")
    @Test
    @DisplayName("Delete a task")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void testDeleteTask_OK() throws Exception {
        Long id = 3L;
        mockMvc.perform(delete("/tasks/{id}", id))
                .andExpect(status().isNoContent())
                .andReturn();
    }

    @WithMockUser(username = "test@gmail.com")
    @Test
    @DisplayName("Not delete a task because user does not have an access")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void testDeleteTask_notOK_doesNotHaveAccess() throws Exception {
        Long id = 3L;
        mockMvc.perform(delete("/tasks/{id}", id))
                .andExpect(status().isConflict())
                .andReturn();
    }

    @WithMockUser(username = "arsenbuter@gmail.com")
    @Test
    @DisplayName("Not delete a task because task's id is wrong")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void testDeleteTask_notOK_wrongTaskId() throws Exception {
        Long id = 4L;
        mockMvc.perform(delete("/tasks/{id}", id))
                .andExpect(status().isConflict())
                .andReturn();
    }
}

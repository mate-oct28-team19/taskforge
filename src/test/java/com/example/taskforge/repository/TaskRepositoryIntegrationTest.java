package com.example.taskforge.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.example.taskforge.model.Task;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class TaskRepositoryIntegrationTest {
    private static final Long FIRST_USER_ID = 1L;
    private static final Long SECOND_USER_ID = 2L;
    private static final LocalDate ONE_MONTH_AGO = LocalDate.now().minusMonths(1);

    @Autowired
    private TaskRepository taskRepository;

    @Test
    @DisplayName("Find tasks by user's id with valid id")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void testFindAllByUserId_withValidUserId() {
        List<Task> tasks = taskRepository.findAllByUserId(FIRST_USER_ID);
        assertEquals(3, tasks.size());
    }

    @Test
    @DisplayName("Find tasks by user's id with invalid id")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void testFindAllByUserId_withInvalidUserId() {
        List<Task> tasks = taskRepository.findAllByUserId(SECOND_USER_ID);
        assertEquals(0, tasks.size());
    }

    @Test
    @DisplayName("Delete old tasks with status 'DONE'")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void testDeleteOldTasksWithStatusDone() {
        taskRepository.deleteOldTasksWithStatusDone(ONE_MONTH_AGO);
        assertEquals(2, taskRepository.count());
    }

    @Test
    @DisplayName("Delete tasks by user's id with valid id")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void testDeleteTasksByUserId_withValidUserId() {
        taskRepository.deleteTasksByUserId(FIRST_USER_ID);
        assertEquals(0, taskRepository.count());
    }

    @Test
    @DisplayName("Delete tasks by user's id with invalid id")
    @Sql(scripts = "classpath:database/add-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-task-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void testDeleteTasksByUserId_withInvalidUserId() {
        taskRepository.deleteTasksByUserId(SECOND_USER_ID);
        assertEquals(3, taskRepository.count());
    }
}

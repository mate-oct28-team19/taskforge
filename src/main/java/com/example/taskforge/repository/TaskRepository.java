package com.example.taskforge.repository;

import com.example.taskforge.model.Task;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByUserId(Long userId);

    @Modifying
    @Query("DELETE FROM Task t WHERE t.status = 'DONE' AND t.creationDate = :oneMonthAgo")
    void deleteOldTasksWithStatusDone(LocalDate oneMonthAgo);

    @Modifying
    @Query("DELETE FROM Task t WHERE t.user.id = :userId")
    void deleteTasksByUserId(Long userId);
}


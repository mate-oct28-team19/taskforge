package com.example.taskforge.repository;

import com.example.taskforge.model.Task;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {
    Page<Task> findAllByUserId(Long userId, Pageable pageable);

    @Query("SELECT t FROM Task t WHERE t.status = 'DONE' AND t.creationDate = :oneMonthAgo")
    List<Task> findOldTasksWithStatusDone(LocalDate oneMonthAgo);

    @Modifying
    @Query("DELETE FROM Task t WHERE t.user.id = :userId")
    void deleteTasksByUserId(Long userId);
}


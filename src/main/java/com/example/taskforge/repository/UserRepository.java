package com.example.taskforge.repository;

import com.example.taskforge.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

public interface UserRepository extends JpaRepository<User, Long> {
    void deleteById(@NonNull Long id);

    User getUserById(Long id);
}

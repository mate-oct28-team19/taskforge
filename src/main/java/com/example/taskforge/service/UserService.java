package com.example.taskforge.service;

import com.example.taskforge.model.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserService {

    void save(User user);

    @Transactional
    void delete(Long id);

    Optional<User> findByEmail(String email);
}

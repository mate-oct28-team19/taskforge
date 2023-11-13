package com.example.taskforge.service;

import com.example.taskforge.model.User;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

public interface UserService {

    void save(User user);

    @Transactional
    void delete(Long id);

    Optional<User> findByEmail(String email);
}

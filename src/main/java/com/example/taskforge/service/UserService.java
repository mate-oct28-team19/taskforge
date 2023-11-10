package com.example.taskforge.service;

import com.example.taskforge.model.User;
import java.util.Optional;

public interface UserService {

    void save(User user);

    void delete(Long id);

    Optional<User> findByEmail(String email);
}

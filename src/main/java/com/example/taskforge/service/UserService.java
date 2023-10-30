package com.example.taskforge.service;

import com.example.taskforge.dto.CreateUserRequestDto;
import com.example.taskforge.model.User;

public interface UserService {
    User save(CreateUserRequestDto requestDto);

    void update(User user);

    void delete(User user);
}

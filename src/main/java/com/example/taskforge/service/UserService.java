package com.example.taskforge.service;

import com.example.taskforge.dto.user.CreateUserRequestDto;
import com.example.taskforge.model.User;

public interface UserService {
    User save(CreateUserRequestDto requestDto);

    void update(User user);

    void delete(Long id);

    //todo: add change password, language, theme color
}

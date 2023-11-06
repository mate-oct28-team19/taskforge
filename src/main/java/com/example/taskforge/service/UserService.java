package com.example.taskforge.service;

import com.example.taskforge.dto.user.CreateUserRequestDto;
import com.example.taskforge.model.User;
import java.util.Optional;

public interface UserService {

    void save(User user);

    User save(CreateUserRequestDto requestDto);

    void update(User user);

    void delete(Long id);

    void enableUser(Long id);

    Optional<User> findByEmail(String email);



    //todo: add change password, language, theme color
}

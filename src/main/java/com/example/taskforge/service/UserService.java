package com.example.taskforge.service;

import com.example.taskforge.dto.UpdateColorSchemeRequestDto;
import com.example.taskforge.dto.UpdateLanguageRequestDto;
import com.example.taskforge.dto.UpdatePasswordRequestDto;
import com.example.taskforge.model.User;
import java.util.Optional;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;

public interface UserService {

    void save(User user);

    @Transactional
    void delete(Authentication authentication);

    Optional<User> findByEmail(String email);

    void updatePassword(Authentication authentication, UpdatePasswordRequestDto requestDto);

    void updateColor(Authentication authentication, UpdateColorSchemeRequestDto dto);

    void updateLanguage(Authentication authentication, UpdateLanguageRequestDto dto);
}

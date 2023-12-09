package com.example.taskforge.service.impls;

import com.example.taskforge.dto.UpdateColorSchemeRequestDto;
import com.example.taskforge.dto.UpdateLanguageRequestDto;
import com.example.taskforge.dto.UpdatePasswordRequestDto;
import com.example.taskforge.model.User;
import com.example.taskforge.repository.TaskRepository;
import com.example.taskforge.repository.UserRepository;
import com.example.taskforge.service.UserService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Transactional
    @Override
    public void delete(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        taskRepository.deleteTasksByUserId(user.getId());
        userRepository.deleteById(user.getId());
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void updatePassword(Authentication authentication, UpdatePasswordRequestDto dto) {
        User user = (User) authentication.getPrincipal();
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public void updateColor(Authentication authentication, UpdateColorSchemeRequestDto dto) {
        User user = (User) authentication.getPrincipal();
        user.setColorScheme(dto.getColorScheme());
        userRepository.save(user);
    }

    @Override
    public void updateLanguage(Authentication authentication, UpdateLanguageRequestDto dto) {
        User user = (User) authentication.getPrincipal();
        user.setLanguage(dto.getLanguage());
        userRepository.save(user);
    }
}


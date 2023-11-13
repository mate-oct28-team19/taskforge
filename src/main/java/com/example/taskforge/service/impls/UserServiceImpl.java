package com.example.taskforge.service.impls;

import com.example.taskforge.model.User;
import com.example.taskforge.repository.TaskRepository;
import com.example.taskforge.repository.UserRepository;
import com.example.taskforge.service.UserService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Transactional
    @Override
    public void delete(Long id) {
        taskRepository.deleteTasksByUserId(id);
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}


package com.example.taskforge.service.impls;

import com.example.taskforge.model.User;
import com.example.taskforge.repository.UserRepository;
import com.example.taskforge.service.TaskService;
import com.example.taskforge.service.UserService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final TaskService taskService;

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public void delete(Long id) {
        taskService.deleteAll(id);
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}


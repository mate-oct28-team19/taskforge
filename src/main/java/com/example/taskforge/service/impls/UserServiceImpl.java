package com.example.taskforge.service.impls;

import com.example.taskforge.exception.EntityNotFoundException;
import com.example.taskforge.model.User;
import com.example.taskforge.repository.UserRepository;
import com.example.taskforge.service.TaskService;
import com.example.taskforge.service.UserService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
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
        User user = userRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("No user with id" + id + " found"));
        taskService.findAll(user.getEmail(), Pageable.unpaged())
                .forEach(td -> taskService.delete(user.getEmail(), td.getId()));
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}


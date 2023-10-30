package com.example.taskforge.service.impls;

import com.example.taskforge.dto.CreateUserRequestDto;
import com.example.taskforge.mapper.UserMapper;
import com.example.taskforge.model.User;
import com.example.taskforge.repository.UserRepository;
import com.example.taskforge.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private UserMapper userMapper;

    @Override
    public User save(CreateUserRequestDto requestDto) {
        if (requestDto.getLanguage().isEmpty() || requestDto.getLanguage().isBlank()) {
            requestDto.setLanguage("ENGLISH");
        }
        User user = userMapper.toModel(requestDto);
        return userRepository.save(user);
    }

    @Override
    public void update(User user) {

    }

    @Override
    public void delete(User user) {

    }
}

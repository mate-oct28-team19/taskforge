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
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public User save(CreateUserRequestDto requestDto) {
        requestDto.setLanguage("ENGLISH");
        requestDto.setColorScheme("LIGHT");
        User user = userMapper.toModel(requestDto);
        return userRepository.save(user);
    }

    @Override
    public void update(User user) {

    }

    @Override
    public void delete(Long id) {
        //todo: implement deletion all the task that belongs to user
        userRepository.deleteById(id);
    }
}


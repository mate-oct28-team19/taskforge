package com.example.taskforge.mapper;

import com.example.taskforge.config.MapperConfig;
import com.example.taskforge.dto.CreateUserRequestDto;
import com.example.taskforge.dto.UserResponseDto;
import com.example.taskforge.model.User;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface UserMapper {

    User toModel(CreateUserRequestDto requestDto);

    UserResponseDto toDto(User user);
}

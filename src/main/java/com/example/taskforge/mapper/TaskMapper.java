package com.example.taskforge.mapper;

import com.example.taskforge.config.MapperConfig;
import com.example.taskforge.dto.CreateUserRequestDto;
import com.example.taskforge.dto.UserResponseDto;
import com.example.taskforge.dto.task.CreateTaskRequestDto;
import com.example.taskforge.dto.task.TaskDto;
import com.example.taskforge.model.Task;
import com.example.taskforge.model.User;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface TaskMapper {
    Task toModel(CreateTaskRequestDto requestDto);

    TaskDto toDto(Task task);
}

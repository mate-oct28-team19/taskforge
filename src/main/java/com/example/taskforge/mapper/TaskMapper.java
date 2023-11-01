package com.example.taskforge.mapper;

import com.example.taskforge.config.MapperConfig;
import com.example.taskforge.dto.task.TaskDto;
import com.example.taskforge.model.Task;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface TaskMapper {

    TaskDto toDto(Task task);
}

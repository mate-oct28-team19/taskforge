package com.example.taskforge.mapper;

import com.example.taskforge.config.MapperConfig;
import com.example.taskforge.dto.ConfirmationTokenRequestDto;
import com.example.taskforge.dto.ConfirmationTokenResponseDto;
import com.example.taskforge.model.ConfirmationToken;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface ConfirmationTokenMapper {
    ConfirmationToken toModel(ConfirmationTokenRequestDto createDto);

    ConfirmationTokenResponseDto toDto(ConfirmationToken confirmationToken);
}

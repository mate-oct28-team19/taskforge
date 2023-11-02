package com.example.taskforge.mapper;

import com.example.taskforge.config.MapperConfig;
import com.example.taskforge.dto.CreateConfirmationTokenDto;
import com.example.taskforge.model.ConfirmationToken;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface ConfirmationTokenMapper {
    ConfirmationToken toModel(CreateConfirmationTokenDto createDto);

    ConfirmationTokenResponseDto toDto(ConfirmationToken confirmationToken);
}

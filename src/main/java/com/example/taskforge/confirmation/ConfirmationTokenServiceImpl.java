package com.example.taskforge.confirmation;

import com.example.taskforge.dto.ConfirmationTokenRequestDto;
import com.example.taskforge.dto.ConfirmationTokenResponseDto;
import com.example.taskforge.mapper.ConfirmationTokenMapper;
import com.example.taskforge.model.ConfirmationToken;
import com.example.taskforge.model.User;
import com.example.taskforge.repository.ConfirmationTokenRepository;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConfirmationTokenServiceImpl implements ConfirmationTokenService {
    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final ConfirmationTokenMapper tokenMapper;

    @Override
    public ConfirmationTokenResponseDto save(
            ConfirmationTokenRequestDto confirmationTokenRequestDto) {
        ConfirmationToken confirmationToken =
                confirmationTokenRepository.save(tokenMapper.toModel(confirmationTokenRequestDto));
        return tokenMapper.toDto(confirmationToken);
    }

    public ConfirmationTokenRequestDto generateConfirmationTokenDto(User user) {
        String token = UUID.randomUUID().toString();
        ConfirmationTokenRequestDto createDto = new ConfirmationTokenRequestDto();
        createDto.setToken(token);
        createDto.setCreatedAt(LocalDateTime.now());
        createDto.setExpiresAt(LocalDateTime.now().plusMinutes(15));
        createDto.setUser(user);
        return createDto;
    }
}

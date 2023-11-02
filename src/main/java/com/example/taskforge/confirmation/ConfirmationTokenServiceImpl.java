package com.example.taskforge.confirmation;

import com.example.taskforge.dto.CreateConfirmationTokenDto;
import com.example.taskforge.model.ConfirmationToken;
import com.example.taskforge.model.User;
import com.example.taskforge.repository.ConfirmationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ConfirmationTokenServiceImpl implements ConfirmationTokenService {
    private final ConfirmationTokenRepository confirmationTokenRepository;

    @Override
    public void save(ConfirmationToken confirmationToken) {
        confirmationTokenRepository.save(confirmationToken);
    }

    public CreateConfirmationTokenDto generateConfirmationTokenDto(User user) {
        String token = UUID.randomUUID().toString();
        CreateConfirmationTokenDto createDto = new CreateConfirmationTokenDto();
        createDto.setToken(token);
        createDto.setCreatedAt(LocalDateTime.now());
        createDto.setExpiresAt(LocalDateTime.now().plusMinutes(15));
        createDto.setUser(user);
        return createDto;
    }
}

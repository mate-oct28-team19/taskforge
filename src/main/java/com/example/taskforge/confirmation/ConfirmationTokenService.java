package com.example.taskforge.confirmation;

import com.example.taskforge.dto.ConfirmationTokenRequestDto;
import com.example.taskforge.dto.ConfirmationTokenResponseDto;
import com.example.taskforge.model.User;

public interface ConfirmationTokenService {
    ConfirmationTokenResponseDto save(ConfirmationTokenRequestDto confirmationToken);

    ConfirmationTokenRequestDto generateConfirmationTokenDto(User user);
}

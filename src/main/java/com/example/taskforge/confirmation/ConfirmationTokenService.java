package com.example.taskforge.confirmation;

import com.example.taskforge.dto.CreateConfirmationTokenDto;
import com.example.taskforge.model.ConfirmationToken;
import com.example.taskforge.model.User;

public interface ConfirmationTokenService {
    void save(ConfirmationToken confirmationToken);

    CreateConfirmationTokenDto generateConfirmationTokenDto(User user);
}

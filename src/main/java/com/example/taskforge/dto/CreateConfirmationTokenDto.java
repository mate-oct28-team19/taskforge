package com.example.taskforge.dto;

import com.example.taskforge.model.User;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class CreateConfirmationTokenDto {
    private String token;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private LocalDateTime confirmedAt;
    private User user;
}

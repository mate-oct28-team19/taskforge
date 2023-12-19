package com.example.taskforge.security;

import com.example.taskforge.dto.user.UserLoginRequestDto;
import com.example.taskforge.dto.user.UserLoginResponseDto;
import com.example.taskforge.dto.user.UserRegistrationRequestDto;
import com.example.taskforge.dto.user.UserRegistrationResponseDto;
import com.example.taskforge.exception.RegistrationException;
import java.io.FileNotFoundException;
import java.io.IOException;
import javax.mail.MessagingException;
import org.springframework.core.io.Resource;

public interface AuthenticationService {

    UserRegistrationResponseDto register(UserRegistrationRequestDto requestDto)
            throws RegistrationException, MessagingException, jakarta.mail.MessagingException, IOException;

    UserLoginResponseDto authenticate(UserLoginRequestDto request) throws RegistrationException;

    Resource confirmRegistrationToken(String token) throws RegistrationException, FileNotFoundException;

    UserRegistrationResponseDto resend(String token)
            throws RegistrationException, MessagingException, jakarta.mail.MessagingException, IOException;
}

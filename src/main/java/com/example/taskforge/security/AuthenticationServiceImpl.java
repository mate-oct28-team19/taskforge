package com.example.taskforge.security;

import com.example.taskforge.confirmation.ConfirmationTokenService;
import com.example.taskforge.dto.ConfirmationTokenRequestDto;
import com.example.taskforge.dto.ConfirmationTokenResponseDto;
import com.example.taskforge.dto.user.UserLoginRequestDto;
import com.example.taskforge.dto.user.UserLoginResponseDto;
import com.example.taskforge.dto.user.UserRegistrationRequestDto;
import com.example.taskforge.exception.EntityNotFoundException;
import com.example.taskforge.exception.RegistrationException;
import com.example.taskforge.model.ConfirmationToken;
import com.example.taskforge.model.User;
import com.example.taskforge.repository.UserRepository;
import com.example.taskforge.service.UserService;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public ConfirmationTokenResponseDto register(UserRegistrationRequestDto requestDto)
            throws RegistrationException {
        if (userRepository.findByEmail(requestDto.getEmail()).isPresent()) {
            throw new RegistrationException("Email is already taken, try another one");
        }
        User user = new User();
        user.setEmail(requestDto.getEmail());
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        user.setColorScheme(User.ColorScheme.LIGHT);
        user.setLanguage(User.Language.ENGLISH);
        User userFromDb = userRepository.save(user);

        ConfirmationTokenRequestDto confirmationTokenRequestDto =
                confirmationTokenService.generateConfirmationTokenDto(userFromDb);
        return confirmationTokenService.save(confirmationTokenRequestDto);

        //todo: maybe here we should send an email
        // He returns token in this place

        //return userMapper.toDto(userFromDb);

        //todo: update logic with color and language
    }

    @Override
    public UserLoginResponseDto authenticate(UserLoginRequestDto request)
            throws RegistrationException {
        String email = request.getEmail();
        User user = userService.findByEmail(email).orElseThrow(() ->
                new EntityNotFoundException("login or password incorrect"));
        if (!user.isEnabled()) {
            throw new RegistrationException("email not confirmed yet");
        }
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        String token = jwtUtil.generateToken(authentication.getName());
        return new UserLoginResponseDto(token);
    }

    public String confirmRegistrationToken(String token) throws RegistrationException {
        ConfirmationToken confirmationToken = confirmationTokenService.findToken(token);
        if (confirmationToken.getConfirmedAt() != null) {
            throw new RegistrationException("this email already confirmed");
        }
        LocalDateTime expiresAt = confirmationToken.getExpiresAt();

        if (expiresAt.isBefore(LocalDateTime.now())) {
            throw new RegistrationException("token expired");
        }

        confirmationToken.setConfirmedAt(LocalDateTime.now());
        ConfirmationToken confirmationTokenUpdated =
                confirmationTokenService.update(confirmationToken);
        userService.enableUser(confirmationTokenUpdated.getUser().getId());

        return "confirmed";
    }
}

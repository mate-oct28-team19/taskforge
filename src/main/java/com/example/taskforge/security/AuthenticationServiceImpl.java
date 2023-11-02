package com.example.taskforge.security;

import com.example.taskforge.confirmation.ConfirmationTokenService;
import com.example.taskforge.dto.ConfirmationTokenRequestDto;
import com.example.taskforge.dto.ConfirmationTokenResponseDto;
import com.example.taskforge.dto.user.UserLoginRequestDto;
import com.example.taskforge.dto.user.UserLoginResponseDto;
import com.example.taskforge.dto.user.UserRegistrationRequestDto;
import com.example.taskforge.exception.RegistrationException;
import com.example.taskforge.model.User;
import com.example.taskforge.repository.UserRepository;
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
    public UserLoginResponseDto authenticate(UserLoginRequestDto request) {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        String token = jwtUtil.generateToken(authentication.getName());
        return new UserLoginResponseDto(token);
    }
}

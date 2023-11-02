package com.example.taskforge.security;

import com.example.taskforge.confirmation.ConfirmationTokenService;
import com.example.taskforge.dto.CreateConfirmationTokenDto;
import com.example.taskforge.dto.UserLoginRequestDto;
import com.example.taskforge.dto.UserLoginResponseDto;
import com.example.taskforge.dto.UserRegistrationRequestDto;
import com.example.taskforge.dto.UserResponseDto;
import com.example.taskforge.exception.RegistrationException;
import com.example.taskforge.mapper.ConfirmationTokenMapper;
import com.example.taskforge.mapper.UserMapper;
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
    private final UserMapper userMapper;
    private final AuthenticationManager authenticationManager;
    private final ConfirmationTokenService confirmationTokenService;
    private final ConfirmationTokenMapper confirmationTokenMapper;

    @Override
    public UserResponseDto register(UserRegistrationRequestDto requestDto)
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

        CreateConfirmationTokenDto createConfirmationTokenDto =
                confirmationTokenService.generateConfirmationTokenDto(userFromDb);
        confirmationTokenService.save(confirmationTokenMapper.toModel(createConfirmationTokenDto));

        //todo: maybe here we should send an email
        // He returns token in this place


        return userMapper.toDto(userFromDb);

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

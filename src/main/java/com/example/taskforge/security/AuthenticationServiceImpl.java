package com.example.taskforge.security;

import com.example.taskforge.dto.user.UserLoginRequestDto;
import com.example.taskforge.dto.user.UserLoginResponseDto;
import com.example.taskforge.dto.user.UserRegistrationRequestDto;
import com.example.taskforge.dto.user.UserRegistrationResponseDto;
import com.example.taskforge.email.EmailPropertiesBuilder;
import com.example.taskforge.email.EmailPropertiesBuilderProvider;
import com.example.taskforge.email.EmailSenderService;
import com.example.taskforge.exception.EntityNotFoundException;
import com.example.taskforge.exception.RegistrationException;
import com.example.taskforge.model.Mail;
import com.example.taskforge.model.User;
import com.example.taskforge.repository.UserRepository;
import com.example.taskforge.service.UserService;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private static final int MIN_RANDOM = 100000;
    private static final int MAX_RANDOM = 999999;
    private static final String LINK = "http://ec2-52-91-108-232.compute-1.amazonaws.com/auth/confirm?token=";

    private final EmailPropertiesBuilderProvider emailPropertiesBuilderProvider;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final EmailSenderService emailSender;

    @Override
    public UserRegistrationResponseDto register(UserRegistrationRequestDto requestDto)
            throws RegistrationException, jakarta.mail.MessagingException {
        if (userRepository.findByEmail(requestDto.getEmail()).isPresent()) {
            throw new RegistrationException(
                    "Email " + requestDto.getEmail() + " is already taken, try another one");
        }
        User user = new User();
        user.setEmail(requestDto.getEmail());
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        user.setColorScheme(requestDto.getColorScheme());
        user.setLanguage(requestDto.getLanguage());
        User userFromDb = userRepository.save(user);
        return createRegistrationResponseDto(userFromDb);
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
        String token = jwtUtil.generateToken(user.getEmail());
        return new UserLoginResponseDto(token, user.getColorScheme(), user.getLanguage());
    }

    @Transactional
    public String confirmRegistrationToken(String token) throws RegistrationException {
        checkIsTokenValid(token);
        User user = getUserFromDbByToken(token);
        checkIsUserEnabled(user);
        user.setEnabled(true);
        userService.save(user);
        return "Email confirmed";
    }

    @Override
    public UserRegistrationResponseDto resend(String token) throws RegistrationException, jakarta.mail.MessagingException {
        checkIsTokenValid(token);
        User user = getUserFromDbByToken(token);
        checkIsUserEnabled(user);
        return createRegistrationResponseDto(user);
    }

    private UserRegistrationResponseDto createRegistrationResponseDto(User user) throws jakarta.mail.MessagingException {
        int randomConfirmationCode = generateRandomConfirmationCode();
        String token = jwtUtil.generateToken(user.getEmail());
        sendEmailWithActivationLinkAndCode(token, randomConfirmationCode, user);

        return new UserRegistrationResponseDto(
                token, randomConfirmationCode, user.getColorScheme(), user.getLanguage());
    }

    private void sendEmailWithActivationLinkAndCode(
            String token,
            int randomConfirmationCode,
            User user) throws jakarta.mail.MessagingException {
        EmailPropertiesBuilder emailPropertiesBuilder =
                emailPropertiesBuilderProvider.getEmailPropertiesBuilder(user.getLanguage());

        Map<String, Object> properties
                = emailPropertiesBuilder.buildProperties(randomConfirmationCode, LINK + token);

        Mail mail = Mail.builder()
                .from("taskforge19@gmail.com")
                .to(user.getEmail())
                .htmlTemplate(new Mail.HtmlTemplate("confirmationEmailTemplate", properties))
                .subject(getTitle(user.getLanguage()))
                .build();
        emailSender.sendEmail(mail);
    }

    private User getUserFromDbByToken(String token) throws RegistrationException {
        String email = jwtUtil.getUsername(token);
        return userService.findByEmail(email).orElseThrow(()
                -> new RegistrationException("invalid token"));
    }

    private int generateRandomConfirmationCode() {
        Random random = new Random();
        return random.nextInt(MAX_RANDOM - MIN_RANDOM + 1) + MIN_RANDOM;
    }

    private void checkIsUserEnabled(User user) throws RegistrationException {
        if (user.isEnabled()) {
            throw new RegistrationException("user is already enabled");
        }
    }

    private void checkIsTokenValid(String token) throws RegistrationException {
        if (!jwtUtil.isValidToken(token)) {
            throw new RegistrationException("token is expired");
        }
    }

    private String getTitle(String language) {
        Map<String, String> titlesLanguagesMap = new HashMap<>();
        titlesLanguagesMap.put("ENGLISH", "Confirm your email");
        titlesLanguagesMap.put("POLISH", "Potwierdź swój email");
        titlesLanguagesMap.put("UKRAINIAN", "Підтвердьте свою пошту");
        return titlesLanguagesMap.get(language);
    }
}




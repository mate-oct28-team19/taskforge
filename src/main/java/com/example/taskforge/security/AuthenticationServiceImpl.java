package com.example.taskforge.security;

import com.example.taskforge.dto.user.UserLoginRequestDto;
import com.example.taskforge.dto.user.UserLoginResponseDto;
import com.example.taskforge.dto.user.UserRegistrationRequestDto;
import com.example.taskforge.dto.user.UserRegistrationResponseDto;
import com.example.taskforge.email.EmailSender;
import com.example.taskforge.exception.EntityNotFoundException;
import com.example.taskforge.exception.RegistrationException;
import com.example.taskforge.model.User;
import com.example.taskforge.repository.UserRepository;
import com.example.taskforge.service.UserService;
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
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final EmailSender emailSender;

    @Override
    public UserRegistrationResponseDto register(UserRegistrationRequestDto requestDto)
            throws RegistrationException {
        if (userRepository.findByEmail(requestDto.getEmail()).isPresent()) {
            throw new RegistrationException(
                    "Email " + requestDto.getEmail() + " is already taken, try another one");
        }
        User user = new User();
        user.setEmail(requestDto.getEmail());
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        user.setColorScheme(User.ColorScheme.LIGHT);
        user.setLanguage(User.Language.ENGLISH);
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
        return new UserLoginResponseDto(token);
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
    public UserRegistrationResponseDto resend(String token) throws RegistrationException {
        checkIsTokenValid(token);
        User user = getUserFromDbByToken(token);
        checkIsUserEnabled(user);
        return createRegistrationResponseDto(user);
    }

    @Override
    public void enableUser(String token) throws RegistrationException {
        checkIsTokenValid(token);
        User user = getUserFromDbByToken(token);
        checkIsUserEnabled(user);
        user.setEnabled(true);
        userService.save(user);
    }

    private UserRegistrationResponseDto createRegistrationResponseDto(User user) {
        int randomConfirmationCode = generateRandomConfirmationCode();
        String token = jwtUtil.generateToken(user.getEmail());

        UserRegistrationResponseDto responseDto = new UserRegistrationResponseDto();
        responseDto.setToken(token);
        responseDto.setCode(randomConfirmationCode);

        sendEmailWithActivationLinkAndCode(token, randomConfirmationCode, user);

        return responseDto;
    }

    private void sendEmailWithActivationLinkAndCode(
            String token,
            int randomConfirmationCode,
            User user) {
        String link = "http://localhost:8080/auth/confirm?token=" + token;
        try {
            emailSender.send(user.getEmail(), buildEmail(randomConfirmationCode, link));
        } catch (RegistrationException e) {
            throw new RuntimeException(e);
        }
    }

    private User getUserFromDbByToken(String token) throws RegistrationException {
        String email = jwtUtil.getUsername(token);
        return userService.findByEmail(email).orElseThrow(()
                -> new RegistrationException("invalid token"));
    }

    private int generateRandomConfirmationCode() {
        Random random = new Random();
        int min = 100000;
        int max = 999999;
        return random.nextInt(max - min + 1) + min;
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

    private String buildEmail(int code, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;"
                + "color:#0b0c0c\">\n"
                + "\n"
                + "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n"
                + "\n"
                + "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;"
                + "min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\""
                + "border=\"0\">\n"
                + "    <tbody><tr>\n"
                + "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n"
                + "        \n"
                + "        <table role=\"presentation\" width=\"100%\" style=\""
                + "border-collapse:collapse;"
                + "max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\""
                + " align=\"center\">\n"
                + "          <tbody><tr>\n"
                + "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n"
                + "                <table role=\"presentation\" cellpadding=\"0\" "
                + "cellspacing=\"0\" "
                + "border=\"0\" style=\"border-collapse:collapse\">\n"
                + "                  <tbody><tr>\n"
                + "                    <td style=\"padding-left:10px\">\n"
                + "                  \n"
                + "                    </td>\n"
                + "                    <td style=\"font-size:28px;line-height:1.315789474;"
                + "Margin-top:4px;padding-left:10px\">\n"
                + "                      <span style=\"font-family:Helvetica,Arial,sans-serif;"
                + "font-weight:700;color:#ffffff;"
                + "text-decoration:none;vertical-align:top;display:inline-block\">"
                + "Confirm your email</span>\n"
                + "                    </td>\n"
                + "                  </tr>\n"
                + "                </tbody></table>\n"
                + "              </a>\n"
                + "            </td>\n"
                + "          </tr>\n"
                + "        </tbody></table>\n"
                + "        \n"
                + "      </td>\n"
                + "    </tr>\n"
                + "  </tbody></table>\n"
                + "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" "
                + "align=\"center\" cellpadding=\"0\" cellspacing=\"0\" "
                + "border=\"0\" style=\""
                + "border-collapse:collapse;max-width:580px;width:100%!important\""
                + " width=\"100%\">\n"
                + "    <tbody><tr>\n"
                + "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n"
                + "      <td>\n"
                + "        \n"
                + "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" "
                + "cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n"
                + "                  <tbody><tr>\n"
                + "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n"
                + "                  </tr>\n"
                + "                </tbody></table>\n"
                + "        \n"
                + "      </td>\n"
                + "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n"
                + "    </tr>\n"
                + "  </tbody></table>\n"
                + "\n"
                + "\n"
                + "\n"
                + "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" "
                + "align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\""
                + "border-collapse:collapse;max-width:580px;width:100%!important\""
                + " width=\"100%\">\n"
                + "    <tbody><tr>\n"
                + "      <td height=\"30\"><br></td>\n"
                + "    </tr>\n"
                + "    <tr>\n"
                + "      <td width=\"10\" valign=\"middle\"><br></td>\n"
                + "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;"
                + "line-height:1.315789474;max-width:560px\">\n"
                + "        \n"
                + "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px"
                + ";color:#0b0c0c\">"
                + "Hi.Thank you for registering"
                + " on TaskForge. Your confirmation code is : </p><blockquote style=\""
                + "Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px"
                + " 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\""
                + "Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">"
                + code + " </p></blockquote>\n"
                + "        \n"
                + "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:"
                + "#0b0c0c\"></p><p style=\"Margin:0 0 20px 0;font-size:19px;"
                + "line-height:25px;color:#0b0c0c\"> Or you can click on the link "
                + "below to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;"
                + "border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:"
                + "19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;"
                + "line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">"
                + "Activate Now</a> </p></blockquote>\n Link will expire in 1 minute. "
                + "<p>See you soon</p>"
                + "        \n"
                + "      </td>\n"
                + "      <td width=\"10\" valign=\"middle\"><br></td>\n"
                + "    </tr>\n"
                + "    <tr>\n"
                + "      <td height=\"30\"><br></td>\n"
                + "    </tr>\n"
                + "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n"
                + "\n"
                + "</div></div>";
    }
}

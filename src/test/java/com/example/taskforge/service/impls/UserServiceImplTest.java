package com.example.taskforge.service.impls;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.taskforge.dto.UpdateColorSchemeRequestDto;
import com.example.taskforge.dto.UpdateLanguageRequestDto;
import com.example.taskforge.dto.UpdatePasswordRequestDto;
import com.example.taskforge.model.User;
import com.example.taskforge.repository.TaskRepository;
import com.example.taskforge.repository.UserRepository;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private TaskRepository taskRepository;
    @Mock
    private Authentication authentication;
    @Mock
    private PasswordEncoder passwordEncoder;
    @InjectMocks
    private UserServiceImpl userService;
    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setPassword("123456Aa!");
        user.setEnabled(true);
        user.setLanguage("UKRAINIAN");
        user.setEmail("mail@email.com");
        user.setColorScheme("LIGHT");
    }

    @Test
    @DisplayName("Tests whether save() method works")
    void save_withValidUser_Ok() {
        assertDoesNotThrow(() -> userService.save(user));
        verify(userRepository, times(1)).save(user);
    }

    @Test
    @DisplayName("Tests whether delete() method works")
    void delete_withValidUser_Ok() {
        when((User) authentication.getPrincipal()).thenReturn(user);
        assertDoesNotThrow(() -> userService.delete(authentication));
        verify(taskRepository, times(1)).deleteTasksByUserId(user.getId());
        verify(userRepository, times(1)).deleteById(user.getId());
    }

    @Test
    @DisplayName("Tests whether findByEmail() method works")
    void findByEmail_withValidUser_Ok() {
        String email = "mail@email.com";
        Optional<User> expected = Optional.of(user);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        assertDoesNotThrow(() -> userService.findByEmail(email));
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    @DisplayName("Tests whether updatePassword() method works")
    void updatePassword_withValidPassword_Ok() {
        UpdatePasswordRequestDto dto = new UpdatePasswordRequestDto();
        when((User) authentication.getPrincipal()).thenReturn(user);
        assertDoesNotThrow(() -> userService.updatePassword(authentication, dto));
        verify(authentication, times(1)).getPrincipal();
        verify(passwordEncoder, times(1)).encode(dto.getNewPassword());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    @DisplayName("Tests whether updateColor() method works")
    void updateColor_withValidColorScheme_Ok() {
        UpdateColorSchemeRequestDto dto = new UpdateColorSchemeRequestDto();
        when((User) authentication.getPrincipal()).thenReturn(user);
        assertDoesNotThrow(() -> userService.updateColor(authentication, dto));
        verify(authentication, times(1)).getPrincipal();
        verify(userRepository, times(1)).save(user);
    }

    @Test
    @DisplayName("Tests whether updateLanguage() method works")
    void updateLanguage_withValidLanguage_Ok() {
        UpdateLanguageRequestDto dto = new UpdateLanguageRequestDto();
        when((User) authentication.getPrincipal()).thenReturn(user);
        assertDoesNotThrow(() -> userService.updateLanguage(authentication, dto));
        verify(authentication, times(1)).getPrincipal();
        verify(userRepository, times(1)).save(user);
    }
}

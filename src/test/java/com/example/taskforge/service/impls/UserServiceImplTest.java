package com.example.taskforge.service.impls;

import com.example.taskforge.dto.UpdatePasswordRequestDto;
import com.example.taskforge.model.User;
import com.example.taskforge.repository.TaskRepository;
import com.example.taskforge.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

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
        user.setEmail("userffffffff@email.com");
        user.setColorScheme("LIGHT");
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    @DisplayName("Tests whether save method works")
    void save_withValidUser_ShouldSaveUser() {
        //given

        //when
        assertDoesNotThrow(() -> userService.save(user));
        //then
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void delete() {
        //given
        when((User) authentication.getPrincipal()).thenReturn(user);
        //when
        assertDoesNotThrow(() -> userService.delete(authentication));
        //then
        verify(taskRepository, times(1)).deleteTasksByUserId(user.getId());
        verify(userRepository, times(1)).deleteById(user.getId());
    }

    @Test
    void findByEmail() {
        //given
        String email = "email";
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        Optional<User> expected = Optional.of(user);
        //when
        Optional<User> actual = userRepository.findByEmail(email);
        //then
        assertEquals(expected, actual);
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    void updatePassword() {
        //given
        UpdatePasswordRequestDto dto = new UpdatePasswordRequestDto();
        when((User) authentication.getPrincipal()).thenReturn(user);
        //when
        assertDoesNotThrow(() -> userService.updatePassword(authentication, dto));
        //then
        verify(authentication, times(1)).getPrincipal();
        verify(passwordEncoder, times(1)).encode(dto.getNewPassword());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void updateColor() {
    }

    @Test
    void updateLanguage() {
    }
}
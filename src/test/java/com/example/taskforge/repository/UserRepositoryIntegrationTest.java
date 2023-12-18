package com.example.taskforge.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.example.taskforge.model.User;
import java.util.Optional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryIntegrationTest {
    private static final String USER_EMAIL = "test@email.com";
    private static final String PASSWORD = "123456Aa!Adth";
    private User expected;
    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        expected = new User();
        expected.setEmail("test@email.com");
        expected.setPassword(PASSWORD);
        expected.setId(1L);
        expected.setEnabled(true);
        expected.setLanguage("UKRAINIAN");
        expected.setColorScheme("LIGHT");
    }

    @Test
    @Sql(scripts = "classpath:database/add-for-user-tests.sql",
            executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:database/delete-for-user-tests.sql",
            executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void findByEmail_ExistingUser_Ok() {
        User actual = userRepository.findByEmail(USER_EMAIL).get();
        assertEquals(expected, actual);
    }

    @Test
    void findByEmail_NonExistingUser_Ok() {
        Optional<User> userOptional = userRepository.findByEmail(USER_EMAIL);
        Assertions.assertFalse(userOptional.isPresent());
    }
}

package com.example.taskforge.controller;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.taskforge.dto.UpdateColorSchemeRequestDto;
import com.example.taskforge.dto.UpdateLanguageRequestDto;
import com.example.taskforge.dto.UpdatePasswordRequestDto;
import com.example.taskforge.dto.user.UserPropertiesResponseDto;
import com.example.taskforge.model.User;
import com.example.taskforge.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerIntegrationTest {
    protected static MockMvc mockMvc;
    private static final String TEST_USER_EMAIL = "test@email.com";
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    private User user;

    @BeforeAll
    static void beforeAll(@Autowired WebApplicationContext applicationContext) {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(applicationContext)
                .apply(springSecurity())
                .build();
    }

    @BeforeEach
    void setUp() {
        user = new User();
        user.setLanguage("UKRAINIAN");
        user.setColorScheme("LIGHT");
        user.setPassword("123456Aa!Adth");
        user.setEmail(TEST_USER_EMAIL);
        user.setEnabled(true);
        user.setId(1L);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    @DisplayName("Deletes a user from the database")
    @Sql(scripts = {
            "classpath:database/add-for-user-tests.sql"
    }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = {
            "classpath:database/delete-for-user-tests.sql"
    }, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void delete_ValidUser_Ok() throws Exception {
        Authentication authentication = new TestingAuthenticationToken(user, null, "ROLE_USER");
        authentication.setAuthenticated(true);
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/users")
                        .with(authentication(authentication))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andReturn();
    }

    @Test
    @DisplayName("Changes user color scheme color change")
    @Sql(scripts = {
            "classpath:database/add-for-user-tests.sql"
    }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = {
            "classpath:database/delete-for-user-tests.sql"
    }, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void changeColor_ValidColor_Ok() throws Exception {
        UpdateColorSchemeRequestDto dto = new UpdateColorSchemeRequestDto();
        dto.setColorScheme("DARK");

        Authentication authentication = new TestingAuthenticationToken(user, null, "ROLE_USER");
        authentication.setAuthenticated(true);

        String jsonRequest = objectMapper.writeValueAsString(dto);

        mockMvc.perform(MockMvcRequestBuilders
                        .patch("/users/color_scheme")
                        .with(authentication(authentication))
                        .content(jsonRequest)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        User actualUser = userService.findByEmail(TEST_USER_EMAIL).get();
        Assertions.assertEquals("DARK", actualUser.getColorScheme());
    }

    @Test
    @DisplayName("Changes user language change")
    @Sql(scripts = {
            "classpath:database/add-for-user-tests.sql"
    }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = {
            "classpath:database/delete-for-user-tests.sql"
    }, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void changeLanguage_ValidLanguage_Ok() throws Exception {
        UpdateLanguageRequestDto dto = new UpdateLanguageRequestDto();
        dto.setLanguage("ENGLISH");

        Authentication authentication = new TestingAuthenticationToken(user, null, "ROLE_USER");
        authentication.setAuthenticated(true);

        String jsonRequest = objectMapper.writeValueAsString(dto);

        mockMvc.perform(MockMvcRequestBuilders
                        .patch("/users/language")
                        .with(authentication(authentication))
                        .content(jsonRequest)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        User actualUser = userService.findByEmail(TEST_USER_EMAIL).get();
        Assertions.assertEquals("ENGLISH", actualUser.getLanguage());

    }

    @Test
    @DisplayName("Changes user password change")
    @Sql(scripts = {
            "classpath:database/add-for-user-tests.sql"
    }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = {
            "classpath:database/delete-for-user-tests.sql"
    }, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void changePassword() throws Exception {
        UpdatePasswordRequestDto dto = new UpdatePasswordRequestDto();
        dto.setNewPassword("newPassword12!");

        Authentication authentication = new TestingAuthenticationToken(user, null, "ROLE_USER");
        authentication.setAuthenticated(true);

        String jsonRequest = objectMapper.writeValueAsString(dto);

        mockMvc.perform(MockMvcRequestBuilders
                        .patch("/users/password")
                        .with(authentication(authentication))
                        .content(jsonRequest)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        User actualUser = userService.findByEmail(TEST_USER_EMAIL).get();
        Assertions.assertTrue(passwordEncoder.matches("newPassword12!", actualUser.getPassword()));
    }

    @Test
    @DisplayName("Tests whether getProperties works")
    @Sql(scripts = {
            "classpath:database/add-for-user-tests.sql"
    }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = {
            "classpath:database/delete-for-user-tests.sql"
    }, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void getProperties() throws Exception {
        UserPropertiesResponseDto expected = new UserPropertiesResponseDto("LIGHT", "UKRAINIAN");

        Authentication authentication = new TestingAuthenticationToken(user, null, "ROLE_USER");
        authentication.setAuthenticated(true);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders
                        .get("/users/properties")
                        .with(authentication(authentication))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        UserPropertiesResponseDto actual = objectMapper.readValue(
                result.getResponse().getContentAsString(), UserPropertiesResponseDto.class);
        Assertions.assertEquals(expected, actual);
    }
}

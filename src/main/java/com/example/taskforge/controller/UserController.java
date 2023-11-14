package com.example.taskforge.controller;

import com.example.taskforge.dto.UpdateColorSchemeRequestDto;
import com.example.taskforge.dto.UpdateLanguageRequestDto;
import com.example.taskforge.model.User;
import com.example.taskforge.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "User management", description = "Endpoints to delete user")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Operation(summary = "Delete", description = "Delete user and its information")
    @DeleteMapping()
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @CrossOrigin(origins = "*")
    void delete(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        userService.delete(user);
    }

    @Operation(summary = "Update color scheme", description = "Updates color scheme in db for certain user")
    @PutMapping("/color_scheme")
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin(origins = "*")
        void changeColor(@RequestBody @Valid UpdateColorSchemeRequestDto dto, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        user.setColorScheme(dto.getColorScheme());
        userService.save(user);
    }

    @Operation(summary = "Update language", description = "Updates language in db for certain user")
    @PutMapping("/language")
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin(origins = "*")
        void changeLanguage(@RequestBody @Valid UpdateLanguageRequestDto dto, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        user.setLanguage(dto.getLanguage());
        userService.save(user);
    }
}

package com.example.taskforge.controller;

import com.example.taskforge.dto.UpdateColorSchemeRequestDto;
import com.example.taskforge.dto.UpdateLanguageRequestDto;
import com.example.taskforge.dto.UpdatePasswordRequestDto;
import com.example.taskforge.dto.user.UserPropertiesResponseDto;
import com.example.taskforge.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "User management", description = "Endpoints to delete user or update preferences")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Operation(summary = "Delete", description = "Delete user and its information")
    @DeleteMapping()
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(Authentication authentication) {
        userService.delete(authentication);
    }

    @Operation(summary = "Update color scheme", description = "Updates color scheme in db for certain user")
    @PatchMapping("/color_scheme")
    @ResponseStatus(HttpStatus.OK)
    void changeColor(@RequestBody @Valid UpdateColorSchemeRequestDto dto, Authentication authentication) {
        userService.updateColor(authentication, dto);
    }

    @Operation(summary = "Update language", description = "Updates language in db for certain user")
    @PatchMapping("/language")
    @ResponseStatus(HttpStatus.OK)
    void changeLanguage(@RequestBody @Valid UpdateLanguageRequestDto dto, Authentication authentication) {
        userService.updateLanguage(authentication, dto);
    }

    @Operation(summary = "Update password", description = "Updates password in db for certain user")
    @PatchMapping("/password")
    @ResponseStatus(HttpStatus.OK)
    void changePassword(@RequestBody @Valid UpdatePasswordRequestDto dto, Authentication authentication) {
        userService.updatePassword(authentication, dto);
    }

    @Operation(summary = "Get color theme and language", description = "Returnes color theme and language for certain user")
    @GetMapping("/properties")
    @ResponseStatus(HttpStatus.OK)
    UserPropertiesResponseDto getProperties(@RequestBody Authentication authentication) {
        return userService.getProperties(authentication);
    }

}

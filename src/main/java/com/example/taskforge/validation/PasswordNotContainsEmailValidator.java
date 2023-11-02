package com.example.taskforge.validation;

import com.example.taskforge.dto.UserRegistrationRequestDto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordNotContainsEmailValidator implements ConstraintValidator
        <PasswordNotContainsEmail, UserRegistrationRequestDto> {
    @Override
    public boolean isValid(UserRegistrationRequestDto dto, ConstraintValidatorContext context) {
        return !dto.getPassword().contains(dto.getEmail());
    }
}

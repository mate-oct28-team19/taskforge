package com.example.taskforge.validation;

import com.example.taskforge.dto.UserRegistrationRequestDto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PassNotContainsEmailValidator implements ConstraintValidator
        <PassNotContainsEmail, UserRegistrationRequestDto> {
    @Override
    public boolean isValid(UserRegistrationRequestDto dto, ConstraintValidatorContext context) {
        return !dto.getPassword().contains(dto.getEmail());
    }
}

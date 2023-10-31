package com.example.taskforge.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class EmailValidator implements ConstraintValidator<Email, String> {

    private static final String PATTERN_OF_EMAIL = "^(?=.{1,64}$)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]"
            + "+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?=[A-Za-z0-9-]{1,63}\\.)(?!-)"
            + "[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*(\\.[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)+$";

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        return Pattern.matches(PATTERN_OF_EMAIL, email);
    }
}

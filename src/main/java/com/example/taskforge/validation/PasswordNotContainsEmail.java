package com.example.taskforge.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = PasswordNotContainsEmailValidator.class)
@Target({ElementType.PARAMETER, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface PasswordNotContainsEmail {
    String message() default "password should not contain email in it's body";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

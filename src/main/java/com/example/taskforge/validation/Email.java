package com.example.taskforge.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = EmailValidator.class)
@Target({ElementType.PARAMETER, ElementType.FIELD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface Email {
    String message() default "please make sure your email address is correct";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

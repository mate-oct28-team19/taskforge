package com.example.taskforge.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = FieldMatchValidator.class)
@Target({ElementType.PARAMETER, ElementType.FIELD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface FieldMatch {
    String message() default "password and repeat password must be the same";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

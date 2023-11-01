package com.example.taskforge.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = PassNotContainsEmailValidator.class)
@Target({ElementType.PARAMETER, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface PassNotContainsEmail {
    String message() default "Password should not contain email in it's body";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

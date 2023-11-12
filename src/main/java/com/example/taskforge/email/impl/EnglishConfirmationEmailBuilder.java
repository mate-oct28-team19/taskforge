package com.example.taskforge.email.impl;

import com.example.taskforge.email.EmailBuilder;
import org.springframework.stereotype.Component;

@Component
public class EnglishConfirmationEmailBuilder implements EmailBuilder {
    private String title = "Confirm your email";
    private String intro = "Hi.Thank you for registering on TaskForge. Your confirmation code is :";
    private String secondPart = "Or click on the link below to activate your account:";
    @Override
    public String buildConfirmationEmail(int code, String link) {
        return null;
    }
}

package com.example.taskforge.email.impl;

import com.example.taskforge.email.EmailBuilder;
import org.springframework.stereotype.Component;

@Component
public class PolishConfirmationEmailBuilder implements EmailBuilder {
    private String title = "Prosze potwierdź swój email";
    private String intro = "Cześć. Dziękujemy za rejestrację na TaskForge. Twój kod weryfikacyjny:";
    private String secondPart = "Lub kliknij poniższy link, aby aktywować swoje konto:";

    @Override
    public String buildConfirmationEmail(int code, String link) {

        return null;
    }
}

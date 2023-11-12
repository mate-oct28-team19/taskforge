package com.example.taskforge.email;

import com.example.taskforge.email.impl.EnglishConfirmationEmailBuilder;
import com.example.taskforge.email.impl.PolishConfirmationEmailBuilder;
import com.example.taskforge.email.impl.UkrainianConfirmationEmailBuilder;

public class ConfirmationEmailProvider {
    public EmailBuilder getEmailBuilder(String language) {
        return switch (language) {
            case "POLISH" -> new PolishConfirmationEmailBuilder();
            case "UKRAINIAN" -> new UkrainianConfirmationEmailBuilder();
            default -> new EnglishConfirmationEmailBuilder();
        };
    }
}

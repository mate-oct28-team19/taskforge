package com.example.taskforge.email.impl;

import com.example.taskforge.email.EmailBuilder;
import org.springframework.stereotype.Component;

@Component
public class UkrainianConfirmationEmailBuilder implements EmailBuilder{
    private String title = "Підтвердьте свою електронну пошту будь ласка";
    private String intro = "Привіт. Дякуємо за реєстрацію на TaskForge. Ваш код підтвердження:";
    private String secondPart = "Або настисніть на посилання нижче, для активації облікового запису:";

    @Override
    public String buildConfirmationEmail(int code, String link) {

        return null;
    }
}

package com.example.taskforge.email.impl;

import com.example.taskforge.email.EmailPropertiesBuilder;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import java.util.Map;

@Component
public class PolishEmailPropertiesBuilder implements EmailPropertiesBuilder {

    @Override
    public Map<String, Object> buildProperties(int code, String link) {
        Map<String, Object> properties = new HashMap<>();
        properties.put("intro", "Cześć. Dziękujemy za rejestrację na TaskForge. Twój kod potwierdzający to:");
        properties.put("code", code);
        properties.put("secondPart", "Lub kliknij poniższy link, aby aktywować swoje konto:");
        properties.put("link", link);
        properties.put("linkText", "Aktywuj teraz!");
        return properties;
    }
}

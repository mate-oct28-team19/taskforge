package com.example.taskforge.email;

import com.example.taskforge.email.impl.EnglishEmailPropertiesBuilder;
import com.example.taskforge.email.impl.PolishEmailPropertiesBuilder;
import com.example.taskforge.email.impl.UkrainianEmailPropertiesBuilder;
import org.springframework.stereotype.Component;

@Component
public class EmailPropertiesBuilderProvider {
    public EmailPropertiesBuilder getEmailPropertiesBuilder(String language) {
        return switch (language) {
            case "POLISH" -> new PolishEmailPropertiesBuilder();
            case "UKRAINIAN" -> new UkrainianEmailPropertiesBuilder();
            default -> new EnglishEmailPropertiesBuilder();
        };
    }
}

package com.example.taskforge.email.impl;

import com.example.taskforge.email.EmailPropertiesBuilder;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class UkrainianEmailPropertiesBuilder implements EmailPropertiesBuilder {

    @Override
    public Map<String, Object> buildProperties(int code, String link) {
        Map<String, Object> properties = new HashMap<>();
        properties.put("intro", "Привіт. Дякуємо за реєстрацію на TaskForge. Ваш код підтвердження:");
        properties.put("code", code);
        properties.put("secondPart", "Або натисніть посилання нижче, щоб активувати свій обліковий запис:");
        properties.put("link", link);
        properties.put("linkText", "Активуй зараз!");
        return properties;
    }
}

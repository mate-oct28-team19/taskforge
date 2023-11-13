package com.example.taskforge.email.impl;

import com.example.taskforge.email.EmailPropertiesBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class EnglishEmailPropertiesBuilder implements EmailPropertiesBuilder {

    public Map<String, Object> buildProperties(int code, String link) {
        Map<String, Object> properties = new HashMap<>();
        properties.put("intro", "Hi. Thank you for registering on TaskForge. Your confirmation code is :");
        properties.put("code", code);
        properties.put("secondPart", "Or click on the link below to activate your account:");
        properties.put("link", link);
        properties.put("linkText", "Activate now!");
        return properties;
    }
}

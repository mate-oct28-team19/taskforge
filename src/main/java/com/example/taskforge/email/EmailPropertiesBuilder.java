package com.example.taskforge.email;

import java.util.Map;

public interface EmailPropertiesBuilder {
    Map<String, Object> buildProperties(int code, String link);
}

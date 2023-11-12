package com.example.taskforge.email;

public interface EmailBuilder {
    String buildConfirmationEmail(int code, String link);
}

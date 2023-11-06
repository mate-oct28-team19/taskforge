package com.example.taskforge.email;

import com.example.taskforge.exception.RegistrationException;

public interface EmailSender {
    void send(String to, String email) throws RegistrationException;
}

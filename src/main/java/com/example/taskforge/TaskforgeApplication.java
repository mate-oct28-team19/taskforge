package com.example.taskforge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TaskforgeApplication {
    public static void main(String[] args) {
        SpringApplication.run(TaskforgeApplication.class, args);
    }
}

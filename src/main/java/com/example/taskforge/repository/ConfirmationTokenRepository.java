package com.example.taskforge.repository;

import com.example.taskforge.model.ConfirmationToken;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {
    Optional<ConfirmationToken> findByToken(String token);
}

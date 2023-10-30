package com.example.taskforge.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableMethodSecurity
@RequiredArgsConstructor
@Configuration
public class SecurityConfig {
//    private final UserDetailsService userDetailsService;
//    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        return http
//                .cors(AbstractHttpConfigurer::disable)
//                .csrf(AbstractHttpConfigurer::disable)
//                .authorizeHttpRequests(
//                        auth -> auth
//                                .requestMatchers("/auth/**", "/swagger-ui/**", "/v3/api-docs/**")
//                                .permitAll()
//                                .anyRequest()
//                                .authenticated()
//                )
//                .sessionManagement(session -> session.sessionCreationPolicy(
//                        SessionCreationPolicy.STATELESS))
//                .addFilterBefore(jwtAuthenticationFilter,
//                        UsernamePasswordAuthenticationFilter.class)
//                .userDetailsService(userDetailsService)
//                .build();
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(
//            AuthenticationConfiguration authenticationConfiguration)
//            throws Exception {
//        return authenticationConfiguration.getAuthenticationManager();
//    }
}

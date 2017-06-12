package edu.fudan.neocommerce.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthConfig {
    @Bean
    public UserService userService() {
        return new UserService();
    }

    @Bean
    public TokenService tokenService() {
        return new TokenService();
    }

    @Bean
    public AuthService authService() {
        return new AuthService();
    }
}

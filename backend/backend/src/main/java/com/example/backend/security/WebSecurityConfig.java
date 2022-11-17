package com.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .antMatcher("/api/**")
                .authorizeRequests(authorize -> authorize
                        .anyRequest().authenticated()
                ) //애플리케이션에 대한 모든 요청에 사용자 인증이 필요하도록 한다.
                .formLogin(withDefaults()) //사용자가 양식 기반 로그인으로 인증할 수 있습니다.
                .httpBasic(withDefaults()); //사용자가 HTTP 기본 인증으로 인증할 수 있습니다.
        return http.build();
    }
}

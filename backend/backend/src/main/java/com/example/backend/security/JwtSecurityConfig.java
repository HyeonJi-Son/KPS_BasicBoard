package com.example.backend.security;

import com.example.backend.security.jwt.JwtFilter;
import com.example.backend.security.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    //SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> 인터페이스를 구현하는 구현체
    //직접 만든 2가지의 클래스 TokenProvider와 JwtFilter를 SecurityConfig에 적용할 때 사용.

    private final TokenProvider tokenProvider;

    //HttpSecurity클래스란?
        /*
        인증, 인가의 세부적인 기능을 설정할 수 있도록 API를 제공해주는 클래스.
         */

    @Override
    public void configure(HttpSecurity http) {
        //1. configure 메소드는 Token Provider를 주입받아서 JwtFilter를 통해
            //SecurityConfig 안에 필터를 등록한다.
        //2. Spring Security 전반적인 필터에 Token Provider(?)가 적용된다.

        JwtFilter customFilter = new JwtFilter(tokenProvider);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
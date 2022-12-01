package com.example.backend.security.jwt;

import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    //유효하지 않은 접근을 할 때 response에 error를 만들어주는 컴포넌트

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            org.springframework.security.core.AuthenticationException authException
    ) throws IOException, ServletException {
        //유효한 자격증명을 제공하지 않고 접근하려고 할 때 401
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }
}

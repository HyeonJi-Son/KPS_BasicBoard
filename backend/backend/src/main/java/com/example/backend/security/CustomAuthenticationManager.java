package com.example.backend.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

public class CustomAuthenticationManager implements AuthenticationManager {
    //Authenticationmanager를 상속받는 CustomAuthenticationManager

    static final List<GrantedAuthority> AUTHORITIES = new ArrayList<GrantedAuthority>();
    //GrantedAuthority란? 현재 사용자가 가지고 있는 권한을 의미한다.

    static { //static: 변수 메머리에 한 번 할당되어 프로그램이 종료될 때 해제되는 변수.
             // 여러 객체가 해당 메모리를 공유한다.
             //Static Method는 객체의 생성 없이 호출 가능. 객체에서 호출은 불가능.
        AUTHORITIES.add(new SimpleGrantedAuthority("ROLE_USER"));
        //
    }

    public Authentication authenticate(Authentication auth) throws AuthenticationException {
        //TODO: 찐인증
        return new UsernamePasswordAuthenticationToken(auth.getName(),
                auth.getCredentials(), AUTHORITIES);
    }
}

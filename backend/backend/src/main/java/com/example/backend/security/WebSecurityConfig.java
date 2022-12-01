package com.example.backend.security;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.web.SecurityFilterChain;


import static org.springframework.security.config.Customizer.withDefaults;

/*@EnableWebSecurity: 해당 어노테이션을 선언하면 SpringSecurityFilterChain이 자동으로 포함된다.
    - WebSecurityConfigurerAdapter를 상속받을 수도 있...지만!
    - WebSecurityConfigurerAdapter는 앞으로 지원하지 않을 예정이니 사용을 지양해달라는 표시를 확인할 수 있음.
  @Configuration : 설정파일을 만들기 위한 어노테이션&Bean을 등록하기 위한 어노테이션이다.
    - 스프링 IOC Container에게 해당 클래스가 Bean 구성 Class임을 알려준다.
 */

@EnableWebSecurity
@Configuration
public class WebSecurityConfig {
    @Bean
    @Order(SecurityProperties.BASIC_AUTH_ORDER)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable(); //을 .disalbe<-사용하지 않겠다고 처리해둠.
        //csrf(Cross-site Request Forgery)
        //사이트간 요청 위조, 웹 애플리케이션의 취약점중 하나로, 이용자가 의도하지않은 공격


        http
                .authorizeRequests()
                .antMatchers("/basicBoard/**", "/member/**").permitAll() //permitAll<-권한 상관없이 모두 접근 가능.
                .anyRequest().authenticated()
                .and()
//                .authorizeRequests(authorize -> authorize
//                        .anyRequest().authenticated()
                 //애플리케이션에 대한 모든 요청에 사용자 인증이 필요하도록 한다.
                .formLogin(withDefaults()) //사용자가 양식 기반 로그인으로 인증할 수 있습니다.
                .httpBasic(withDefaults()); //사용자가 HTTP 기본 인증으로 인증할 수 있습니다.

        return http.build();
    }

}

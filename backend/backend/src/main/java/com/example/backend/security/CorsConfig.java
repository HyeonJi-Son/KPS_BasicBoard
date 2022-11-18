package com.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/*
@Configuration 어노테이션은,
- 해당 어노테이션이 붙은 class 내의 @Bean이 붙은 메서드를 빈으로 등록해준다.
    - 이 때 싱글톤(singleton)이 되도록 보장해준다. @Bean만 쓴다면 싱글톤으로 유지x
        - 싱글톤 빈이라는 건 파일을 실행했을 때 1번만 호출이 되도록 해주는 것이다.?(좀더 자세히 알아봐야 함)
- 이 어노테이션이 있다면 스프링 컨테이너에서 Bean을 관리할 수 있게 된다.
 */
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        config.setAllowCredentials(true);
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT", "HEAD"));
                                        //Mapping가능한 방식은 모두 기재해두도록 하자.

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}

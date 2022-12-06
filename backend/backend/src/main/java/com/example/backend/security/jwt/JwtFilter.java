
package com.example.backend.security.jwt;

import com.example.backend.controller.dto.TokenDto;
import com.example.backend.utility.CookieUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//@RequiredArgsConstructor: final이나 @NonNull인 필드 값만 파라미터로 받는 생성자를 만들어준다.

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
                //OncePerRequestFilter란? 동일한 리퀘스트 안에서 한 번만 필터링을 할 수 있게 해주는 것.
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer";
    private final TokenProvider tokenProvider;

    //Request Header에서 토큰 정보를 꺼내오는 메소드다.
    private String resolveToken(HttpServletRequest request) { //HttpServletRequest 요청이 들어오면
        String bearerToken = request.getHeader("Cookie");
        //요청Header를 get해와서 bearerToken이라는 String 타입 변수의 값으로 저장한다.

        //만약 bearerToken정보와
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
                //startWith() 함수: 비교 대상 문자열(Prefix)값으로 시작되는지 여부 확인하고 boolean(true/flase)값으로 리턴
                                            //bearerToken이 BEARER라고 시작된다면 true 반환
            return bearerToken.substring(7);
        }

        return null;
    }

    //필터링을 실행하는 메소드다.
        //Filter: dispatcher servlet이 돌아가며 전역적으로 처리되어야 하는 작업들을 처리한다.
        //이 때 보안 인증, 인가 작업 등 request/response에 대한 내용 변경과 체크가 진행된다.
    @Override
    protected void doFilterInternal
            (HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String jwt = resolveToken(request);
        //request될 때 header에서 꺼낸 토큰 정보를 jwt라는 String 타입 변수로 선언한다.

        //만약 jwt(헤더에서 꺼낸 토큰 정보)와 tokenProvider클래스의 토큰 유효성 검증(validateToken) 모두 참인 경우
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            //tokenProvider의 getAuthentication(토큰을 받았을 때 토큰의 인증을 꺼내는 메소드)로부터
                //return 받은 결과를 authentication이라고 한다.
            SecurityContextHolder.getContext().setAuthentication(authentication);
            //SecurityContextHolder의 SecurityContext에 저장한다.
                //인증 정보를 set한다.(무엇을? - 바로 윗 줄에서 선언한 authentication을 )
                //이제 SecurityContext에서 허가된 uri 이외의 모든 Request요청은 전부 이 필터를 거치게 된다.
                //토큰 정보가 없거나 유효하지 않으면 정상적으로 수행되지 않는다.

        /*Authentication(인증) 인터페이스란?
            - 현재 접근하는 주체의 정보와 권한을 담는 인터페이스다.
            - Authentication 객체는 Security Context에 저장된다.
            - SecurityContextHolder -(접근)-> Security Context -(접근)-> Authentication

            *SecurityContextHolder
                - 보안 주체의 세부 정보를 포함하여 응용 프로그램의 현재 보안 컨텍스트에 대한 세부 정보가 저장됨.
                - SecurityContextHolder.MODE_INHERITABLETHREADLOCAL 방법과
                  SecurityContextHolder.MODE_THREADLOCAL 방법을 기본적으로 제공

            *Security Context
                - Authentication을 보관하는 역할을 함. SecurityContext를 통해 Authentication 객체를 꺼내올 수 있음.
         */

        }

        if (StringUtils.hasText(jwt) && !tokenProvider.validateToken(jwt)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

            CookieUtils.addCookie(response, BEARER_PREFIX, tokenDto.getAccessToken(), -1);
        }

        filterChain.doFilter(request, response);
        //filterChain에서 request와 response에 대한 체크를 한다.
    }
}


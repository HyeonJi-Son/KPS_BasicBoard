package com.example.backend.security.jwt;

import com.example.backend.controller.dto.TokenDto;
import com.example.backend.entity.Member;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

/*
@Slf4j : Java에서 심플한 로깅 인터페이스를 제공하는 API
         로깅 라이브러리를 어떤 것을 사용하던지 같은 방법으로 로그를 남길 수 있게 함.
         이게 없으면 cannot find symbol variable log라는 문구가 확인된다.
         - Facade : 간략화된 인터페이스를 제공해주는 디자인 패턴
@Component : Java Bean에 등록하지 않아도 자동 주입이 가능하도록 해주는 어노테이션이다.
             개발자가 직접 개발한 클래스를 Bean에 등록하기 위한 어노테이션이다.
     - @Repository, @Service 어노테이션은 해당 클래스를 루트 컨테이너에 빈(Bean) 객체로 생성해주는 어노테이션
        - @Service: 내부에서 자바 로직을 처리함
     - @Component 는 이들의 부모 어노테이션으로 똑같이 루트 컨테이너에 Bean객체를 생성해준다.
        - 하지만 가시성이 떨어져 사용을 덜 하는 경우가 있는 것도 같음...
 */
@Slf4j
@Component
public class TokenProvider { //토큰 공급, 인증 확인하는 역할의 클래스.
    //토큰을 생성하고 검증할 때 쓰이는 String 값
    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "bearer";
    //토큰의 만료 시간
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;
    //miliSeconds라서 1000이 1초다.
    //JWT만들 때 사용하는 암호화 키값을 사용하기 위해 security에서 불러옴
    private final Key key; //key값을 final을 주었으니 class내에서 변동되는 일 없음.

    //생성자
                    //이 @Value는 lombok(X), springframework.beans.factory.annotation.Value 소속
    public TokenProvider(@Value("koreapolyschoolprobationamadeasonprobationperiodassignment") String secretKey) { //@Value 어노테이션으로 yaml에 있는 secret key를 가져온 다음,
        byte[] keyBytes = Decoders.BASE64.decode(secretKey); //가져온 secret key값을 Decode 한다.
        this.key = Keys.hmacShaKeyFor(keyBytes); //이후 의존성이 주입된 key 값으로 정한다.
    }

    //토큰을 만드는 메소드
    public TokenDto generateTokenDto(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        //Authentication 인터페이스를 확장한 매개변수를 받아서 그 값을 string으로 변환한다
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

        long now = (new Date().getTime()); //토큰이 생성된 현재시각을 구한다.
        //현재 시각 + 토큰 유지 최대시간 을 토큰 만료 시간으로 정해준다.
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        System.out.println(accessTokenExpiresIn);

        String accessToken = Jwts.builder() //jwt builder를 이용해 Token 생성
                .setSubject(authentication.getName()) //토큰 용도
                .claim(AUTHORITIES_KEY, authorities) //인증키를 claim형태로 만든다.
                .setExpiration(accessTokenExpiresIn) //토큰 만료 시간
                .signWith(key, SignatureAlgorithm.HS256) //내가 쓸 해쉬 암호를 써야 함.
                .compact(); //토큰 생성

        return TokenDto.builder() //TokenDto에 생성한 정보를 넣는다.
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .tokenExpiresIn(accessTokenExpiresIn.getTime())
                .build();
    }


    //토큰을 claims 형태로 만드는 메소드다.
    //이를 통해 받은 토큰에 권한 정보가 있는지 없는지 체크 가능하다.
    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    //토큰을 받았을 때 토큰의 인증을 꺼내는 메소드
    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken); //받은 토큰을 parseClaims 메소드로 string형태의 토큰을 claims 형태로 생성한다.

        if (claims.get(AUTHORITIES_KEY) == null) { //만약 받은 토큰 = claims에 Auth가 없으면 exception을 반환한다.
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }
        //if문에 걸리지 않으면 아래 내역이 작동된다.

        //GrantedAuthority를 상속받은 타입만이 사용 가능한 Collection을 반환한다.
            //GrantedAuthority란 현재 사용자가 가지고 있는 권한들. 보통 ROLE_권한 형태로 사용된다.
            /* Java에서 Collection이란? - 데이터의 집합, 그룹을 의미한다.
                - JCF(Java Colletions Framwork)는 이러한 데이터, 자료구조인 컬렉션과
                  이를 구현하는 클래스를 정의하는 인터페이스를 제공한다.*/

        //↓ 이 Collection 부분...잘 이해가 가지 않는다...
        Collection<? extends GrantedAuthority> authorities =
                //stream을 통한 함수형 프로그래밍으로 claims형태의 토큰을 알맞게 정렬해준다.
                    //SimpleGrantedAuthority 형태의 새 List 생성.(여기에 인가가 들어있음)
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        //UserDatails에 token에서 가져온 정보와 아까 생성한 인가를 넣는다.
            //UserDetails: Spring Security에서 유저의 정보를 담는 인터페이스
        UserDetails principal = new User(claims.getSubject(), "", authorities);

        //유저명+패스워드 인증 토큰 안에 인가와 같이 넣고 return한다.
            //이 "유저명+패스워드 인증 토큰"이라는 인스턴스는
            //UserDatail을 생성하여 후에 SecurityContext에 사용하기 위해 만든 절차이다.
            //SecurityContext는 Authentication 객체를 저장하니까.
        return new UsernamePasswordAuthenticationToken(principal,
                "", authorities);
    }

    //토큰을 검증하기 위한 메소드
    public boolean validateToken(String token) {
        //log는 왜 Cannot resolve symbol 상태인가
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }


}

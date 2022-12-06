package com.example.backend.utility;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

public class CookieUtils {

//    //로그인시 받은 정보에서 쿠키를 가져오는 유틸리티
//    public static Optional<Cookie> getCookie(HttpServletRequest request, String name) {
//        Cookie[] cookies = request.getCookies();
//
//        if(cookies != null && cookies.length > 0) {
//            for(Cookie cookie : cookies) {
//             if(cookie.getName().equals(name)) {
//                 return Optional.of(cookie);
//             }
//            }
//        }
//        return Optional.empty();
//    }

    //쿠키 추가
    public static void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value); //이름과 값을 가진 cookie라는 객체 생성
        cookie.setPath("/"); //uri
        cookie.setHttpOnly(true); //http로만 접근할 수 있는가 boolean 타입으로 설정
        cookie.setMaxAge(maxAge); //토큰 해지까지 최대 시간
        response.addCookie(cookie); //쿠키 객체를 응답에 담아 보낸다.
    }

    //쿠키 value 삭제
    public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    cookie.setValue("");
                    cookie.setPath("/");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            }
        }
    }
}

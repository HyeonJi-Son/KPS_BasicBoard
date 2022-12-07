package com.example.backend.controller;

import com.example.backend.controller.dto.TokenDto;
import com.example.backend.controller.dto.request.MemberRequest;
import com.example.backend.entity.Member;
import com.example.backend.security.CustomAuthenticationManager;
import com.example.backend.security.jwt.JwtFilter;
import com.example.backend.security.jwt.TokenProvider;
import com.example.backend.service.Member.MemberService;
import com.example.backend.utility.CookieUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequestMapping("/member")
public class MemberController {

    private MemberService service;
    private final TokenProvider tokenProvider;
    private TokenDto tokenDto;
    public MemberController(MemberService service, TokenProvider tokenProvider) {
        this.service = service;
        this.tokenProvider = tokenProvider;
    }

    //회원가입
    @PostMapping()
    public Member memberSignUp(@Validated @RequestBody MemberRequest memberRequest) {

        log.info("신규 가입자 확인: "
                + memberRequest.getMemberNo() + memberRequest.getNickName());

        return service.signup(memberRequest);
    }

    //회원가입 도중 메일 중복 확인
    @PostMapping("/emailCheck")
    public boolean emailCheck(@Validated @RequestBody MemberRequest memberRequest) {

        return service.emailCheck(memberRequest);
    }

    @PostMapping("/login")
    public String memberLogIn(@Validated @RequestBody MemberRequest memberRequest, HttpServletResponse response){
        //front로부터 들어오는 정보 email, password

        //만약 service.login 결과가 null이라면 그대로 return null
        //그 외의 경우엔 backend단 쿠키에 토큰을 저장해준다.
        //그리고 service.login의 결과를 return해라.

        String tokenDto = service.login(memberRequest);

        if(tokenDto == null) {
            return null;
        }

        CookieUtils.addCookie(response, JwtFilter.BEARER_PREFIX, tokenDto, -1);
            //HttpServletResponse response, String name, String value, int maxAge(초단위)

        return tokenDto;
        //return 되어야 하는 것 token...
        //하지만 그 전에 로그인 한 멤버 정보 제대로 돌려보내는지 부터 확인.
    }

    @GetMapping("/logout")
    public void memberLogOut(HttpServletRequest request, HttpServletResponse response) {
        //컨트롤러 단에서 cookie 삭제 & accessToken 삭제 해야 한다.
        CookieUtils.deleteCookie(request, response, JwtFilter.BEARER_PREFIX);
    }

}

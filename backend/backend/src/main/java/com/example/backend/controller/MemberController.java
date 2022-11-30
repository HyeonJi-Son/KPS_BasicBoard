package com.example.backend.controller;

import com.example.backend.controller.request.MemberRequest;
import com.example.backend.entity.Member;
import com.example.backend.service.Member.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService service;

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
    public Member memberLogIn(@Validated @RequestBody MemberRequest memberRequest){
        //front로부터 들어오는 정보 email, password

        return service.login(memberRequest);
        //return 되어야 하는 것 token...
        //하지만 그 전에 로그인 한 멤버 정보 제대로 돌려보내는지 부터 확인.
    }

}

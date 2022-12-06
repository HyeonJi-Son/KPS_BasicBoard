package com.example.backend.service.Member;

import com.example.backend.controller.dto.request.MemberRequest;
import com.example.backend.entity.Member;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public interface MemberService {

    public Member signup (MemberRequest memberRequest);
    public boolean emailCheck(MemberRequest memberRequest);
    public String login (MemberRequest memberRequest);

    Collection<? extends GrantedAuthority> getAuthorities();
}

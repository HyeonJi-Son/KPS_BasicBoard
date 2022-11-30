package com.example.backend.service.Member;

import com.example.backend.controller.request.MemberRequest;
import com.example.backend.entity.Member;

public interface MemberService {

    public Member signup (MemberRequest memberRequest);
    public boolean emailCheck(MemberRequest memberRequest);
    public Member login (MemberRequest memberRequest);
}

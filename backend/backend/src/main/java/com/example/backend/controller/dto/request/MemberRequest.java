package com.example.backend.controller.dto.request;

import com.example.backend.entity.Role;
import lombok.Data;

/*
@Data 어노테이션은 @Getter, @Setter, @ToString, @EqualsAndHashCode @RequiredArgsConstructor를
합쳐놓은 것. POJO와 bean과 관련된 모든 보일러 플레이트(boilerplate = 재사용 가능한 코드)를 생성한다.
                                  ------------------------------------------------
                            class의 모든 필드에 대한 getter, setter, toString, equals 같은 함수
*/
@Data
public class MemberRequest {
    private Long memberNo;

    private String nickName;

    private String email;

    private String password;

    private Role role;

    public MemberRequest(Long memberNo, String nickName, String email, String password, Role role){
        this.memberNo = memberNo;
        this.nickName = nickName;
        this.password = password;
        this.email = email;
        this. role = role;
    }
}

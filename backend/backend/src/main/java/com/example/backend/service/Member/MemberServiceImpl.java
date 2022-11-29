package com.example.backend.service.Member;

import com.example.backend.controller.request.MemberRequest;
import com.example.backend.entity.Member;
import com.example.backend.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Member signup (MemberRequest memberRequest) {
        /*
        1. passwordEncoder클래스 (CorsConfig파일에 있음)를 이용하겠다고 선언한다.
            - memberRequest의 password값을 가져와서 클래스에 넣고 암호화된 값을 return받는다.
        2. memberRequest의 password 값 = encodePasswrd로 변경
        3. MemberEntity라는 새로운 클래스에 memberRequest의 값들을 저장한다.
        4. return repository.save(memberRequest);
         */

        log.info("암호화전" + memberRequest.getMemberNo() + memberRequest.getNickName() + memberRequest.getPassword() + memberRequest.getEmail() + memberRequest.getRole());

        String encodePassword = passwordEncoder.encode(memberRequest.getPassword());

        memberRequest.setPassword(encodePassword);

        log.info("암호화후" + memberRequest.getMemberNo() + memberRequest.getNickName() + memberRequest.getPassword());

        Member memberEntity = new Member(memberRequest.getNickName(), memberRequest.getEmail(),
                memberRequest.getPassword(), memberRequest.getRole()
        );


        return repository.save(memberEntity);
    }

    @Override
    public boolean emailCheck(MemberRequest memberRequest) {
        /*
        1. email 내역 따로 써야하니까 request 거쳐야함.
        2. email 내역을 지금까지 table에 저장된 모든 email내역과 비교한다.
            - repository에서 email내역 모두 읽어와야 함.
            - 전부 가져와서 배열에 넣고
            - 배열의 길이만큼 for문 돌리기
        3. 중복이 있다면 false / 중복이 없다면 true를 return 한다.

        ??. 최종적으로 겹치는 게 있다 없다 yes/no로 답이 가면 될 것 같다.
         */

        Member mailCheck = repository.findByEmail(memberRequest.getEmail());

        if( mailCheck == null ){
            return true;
        }

        return false;

    }

}

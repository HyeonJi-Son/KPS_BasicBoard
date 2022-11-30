package com.example.backend.service.Member;

import com.example.backend.controller.request.MemberRequest;
import com.example.backend.entity.Member;
import com.example.backend.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Member login(MemberRequest memberRequest) {

        log.info("평문 패스워드: " + memberRequest.getPassword());

        //클라이언트가 입력한 email과 password를 repository에서 찾는다
            //이 때 암호화 되었던 비밀번호 어떻게 비교할지 알아야 함.
                /*
                1. 로그인을 위해 들어온 평문의 비밀번호 정보와 db에 있는 인코딩된 암호가 일치하는지 확인
                    - 먼저 email을 기준으로 repository에서 저장된 member내역을 받아온다.
                    - 그리고 그 값을 originMember에 넣어두자.
                2. originMember.getPassword()와 새로 들어온 memberRequest.getPassword()를 비교한다.
                   boolean matches(평문의 패스워드, 암호화된 패스워드) 순서로 입력! 반드시!
                    - matches 메소드: 주어진 정규식 표현과 일치하는지 여부를 확인해주는 함수이다.
                    - 디코딩은 절대 안된다!고 하는데 왜지...?

                3. 두 패스워드가 일치하면 true, 불일치하면 false 반환
                4. true인 경우만 로그인 마저 진행되고 false가 나왔다면 null을 return.
                    - 마저 진행되는 로그인 시나리오는 다음과 같다.
                    - 비밀번호를 맞게 입력 하였다면 로그인한 멤버의 정보& JWT를 반환해야 한다.
                        - JWT Token내(payload)에 멤버의 정보도 들어있어야 함.
                 */

        //originMember가 null이 된다면 email을 잘못 입력한 것이다.
        Member originMember = repository.findByEmail(memberRequest.getEmail());

        if(originMember == null ){ return null; }
        //여긴 !originMember로 표시할 수 없다.
        //조건식은 true인지 false인지 보는 것이고 originMember는 boolean타입이 아니니까!

        log.info(originMember.getMemberNo() + "의 패스워드: " + originMember.getPassword());

        boolean checkAnswer = passwordEncoder.matches(memberRequest.getPassword(), originMember.getPassword());
        log.info("패스워드체크 결과: " + checkAnswer);
        //true나 false로 확인될 것임.
        //false로 확인되면 비밀번호를 잘못 입력한 것이다.

        if(checkAnswer){ //true라면 로그인 마저 진행
            //jwt 전에 일단 member정보를 제대로 return하는지를 확인해보자.
            return originMember;
        }

            return null;
    }

}

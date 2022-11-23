package com.example.backend.controller;

import com.example.backend.controller.request.BoardCheckRequest;
import com.example.backend.controller.request.BoardRequest;
import com.example.backend.entity.BasicBoard;
import com.example.backend.entity.User;
import com.example.backend.service.BasicBoard.BasicBoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/basicBoard") //경로 분리해둬도 돌아가는구나
public class BasicBoardController {

    @Autowired
    private BasicBoardService service;

    //void가 아니라 BasicBoard를 이용하도록 했다.
        //Why? - frontend에 등록과 동시에 return하고싶은 내용이 있기 때문에.
    @PostMapping("/register")
    //등록
    public BasicBoard basicBoardRegister(@Validated @RequestBody BoardRequest boardRequest) throws NoSuchAlgorithmException {
        //@Validated 어노테이션: 빈(Bean)검증기를 이용해 객체의 제약 조건을 검증하도록 지시.
                            // JSR표준기술(X) 스프링 프레임워크에서 제공하는 어노테이션 및 기능
        //AOP를 기반으로 스프링 빈의 유효성 검증을 위해 사용. 클래스에는 Validated 메소드네는 Valid 붙여준다.
        //유효성 검증에 실패할 경우 ConstratintViolationException이 발생.

        log.info("registerController 정보 확인: "
                + boardRequest.getBoardNo() + boardRequest.getWriter() + boardRequest.getTitle() );

        return service.register(boardRequest);
        //작성하여 등록한 게시글 내용을 return해주고 있다.
    }

    //목록
    @GetMapping("/list")
    public List<BasicBoard> basicBoardList() {
        return service.list();
    }

    @GetMapping("/{boardNo}")
    //상세보기
    public BasicBoard basicBoardRead(
            @PathVariable ("boardNo") Integer boardNo){
            //@PathVariable은 URL 경로에 변수를 넣어주는 어노테이션이다.
        return service.read(boardNo);
    }


//    //수정
//    public BasicBoard basicBoardModify() {
//
//    }

    //삭제
    @DeleteMapping("/{boardNo}/{checkPw}")
    public boolean basicBoardRemove (@PathVariable("boardNo") Long boardNo,
                                  @PathVariable("checkPw") String checkPw) throws IllegalArgumentException, NoSuchAlgorithmException {
        return service.remove(boardNo, checkPw);
    }


/* front와 back 서로 데이터를 잘 주고받는 상태인지 확인하기 위해 작성했던 테스트용도의 controller다.
    @GetMapping("/users")
    public User user() {
        System.out.println("UserApiController start");
        User user = new User(1, "손현지","kps!1234","amadea.son@edu-poly.com");
        return user;
    }
 */
}

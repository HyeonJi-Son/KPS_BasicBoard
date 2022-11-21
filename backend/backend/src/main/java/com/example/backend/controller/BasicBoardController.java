package com.example.backend.controller;

import com.example.backend.entity.BasicBoard;
import com.example.backend.entity.User;
import com.example.backend.service.BasicBoard.BasicBoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/basicBoard") //경로 분리해둬도 돌아가는구나
public class BasicBoardController {

    @Autowired
    private BasicBoardService service;

    @PostMapping("/register")
    //등록
    public void basicBoardRegister(@Validated @RequestBody BasicBoard basicBoard) {
        //@Validated 어노테이션: 빈(Bean)검증기를 이용해 객체의 제약 조건을 검증하도록 지시.
                            // JSR표준기술(X) 스프링 프레임워크에서 제공하는 어노테이션 및 기능
        //AOP를 기반으로 스프링 빈의 유효성 검증을 위해 사용. 클래스에는 Validated 메소드네는 Valid 붙여준다.
        //유효성 검증에 실패할 경우 ConstratintViolationException이 발생.
        service.register(basicBoard);
    }

    //목록
    @GetMapping("/list")
    public List<BasicBoard> basicBoardList() {
        return service.list();
    }
//
//    //상세보기
//    public BasicBoard basicBoardRead() {
//
//    }
//
//
//    //수정
//    public BasicBoard basicBoardModify() {
//
//    }
//
    //삭제
    @DeleteMapping("/{boardNo}")
    public void basicBoardRemove(
            @PathVariable("boardNo") Integer boardNo) { service.remove(boardNo); }



/* front와 back 서로 데이터를 잘 주고받는 상태인지 확인하기 위해 작성했던 테스트용도의 controller다.
    @GetMapping("/users")
    public User user() {
        System.out.println("UserApiController start");
        User user = new User(1, "손현지","kps!1234","amadea.son@edu-poly.com");
        return user;
    }
 */
}

package com.example.backend.controller;

import com.example.backend.entity.BasicBoard;
import com.example.backend.entity.User;
import com.example.backend.service.BasicBoard.BasicBoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/basicBoard") //경로 분리해둬도 돌아가는구나
public class BasicBoardController {

    @Autowired
    private BasicBoardService service;

    //등록
    public void basicBoardRegister() {

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
//    //삭제
//    @DeleteMapping("/{boardNo}")
//    public void basicBoardRemove() {

//    }



/* front와 back 서로 데이터를 잘 주고받는 상태인지 확인하기 위해 작성했던 테스트용도의 controller다.
    @GetMapping("/users")
    public User user() {
        System.out.println("UserApiController start");
        User user = new User(1, "손현지","kps!1234","amadea.son@edu-poly.com");
        return user;
    }
 */
}

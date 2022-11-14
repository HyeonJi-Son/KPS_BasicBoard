package com.example.backend.controller;

import com.example.backend.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api") //경로 분리해둬도 돌아가는구나
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
//CrossOrigin은 있으나 없으나 결과가 같네?
public class BasicBoardController {

    @PostMapping("/users")
    public User user() {
        System.out.println("UserApiController start");
        User user = new User(1, "손현지","kps!1234","amadea.son@edu-poly.com");
        return user;
    }
}

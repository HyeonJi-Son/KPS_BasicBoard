package com.example.backend.controller.request;

import lombok.Data;

@Data
public class BoardCheckRequest {

    private Long boardNo;
    private String checkPw;
}

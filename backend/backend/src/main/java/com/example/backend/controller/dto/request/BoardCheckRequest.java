package com.example.backend.controller.dto.request;

import lombok.Data;

@Data
public class BoardCheckRequest {

    private Long boardNo;
    private String checkPw;
}

package com.example.backend.controller.dto.request;

import lombok.Data;

@Data
public class BoardRequest {
    private Long boardNo;
    private String title;
    private String writer;
    private String content;
    private String password;

    public BoardRequest(Long boardNo, String title, String writer, String content, String password) {
        this.boardNo = boardNo;
        this.title = title;
        this.writer = writer;
        this.content = content;
        this.password = password;
    }
}

package com.example.backend.service.BasicBoard;

import com.example.backend.controller.request.BoardRequest;
import com.example.backend.entity.BasicBoard;

import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface BasicBoardService {
// 등록, 목록, 상세보기, 수정, 삭제
    public BasicBoard register (BoardRequest boardRequest) throws NoSuchAlgorithmException;
    public List<BasicBoard> list ();
    public BasicBoard read (Integer boardNo);
    public boolean pwCheck (Long boardNo, String checkPw) throws NoSuchAlgorithmException;
    public boolean remove (Long boardNo, String checkPw) throws IllegalArgumentException, NoSuchAlgorithmException;

}

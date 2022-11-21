package com.example.backend.service.BasicBoard;

import com.example.backend.entity.BasicBoard;

import java.util.List;

public interface BasicBoardService {
// 등록, 목록, 상세보기, 수정, 삭제
    public void register (BasicBoard basicBoard);
    public List<BasicBoard> list ();
//    public BasicBoard read (Integer boardNo);
//    public BasicBoard modify (BasicBoard basicBoard);
    public void remove (Integer boardNo);

}

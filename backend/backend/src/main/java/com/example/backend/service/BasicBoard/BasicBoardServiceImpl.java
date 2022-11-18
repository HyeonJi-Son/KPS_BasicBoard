package com.example.backend.service.BasicBoard;

import com.example.backend.entity.BasicBoard;
import com.example.backend.repository.BasicBoardRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class BasicBoardServiceImpl implements BasicBoardService {

    @Autowired
    BasicBoardRepository repository;
    // 등록, 목록, 상세보기, 수정, 삭제

    @Override
    public void register (BasicBoard basicBoard) {

    }

    @Override
    public List<BasicBoard> list (){
        return repository.findAll(Sort.by(Sort.Direction.DESC, "boardNo"));
        // repository의 모든 것을 찾아온다.
        //sort< 정렬한다는 뜻. ASC(오름차순)/DESC(내림차순). "boardNo"를 기준으로
        //잘 활용하여 boardNo 가 아닌 다른 것들을 기준으로 정렬한다면
        //베스트 게시글 등도 정렬할 수 있다.
    }
//    @Override
//    public BasicBoard read (Integer boardNo);

//    @Override
//    public BasicBoard modify (BasicBoard basicBoard);

//    @Override
//    public void remove (Integer boardNo);


}

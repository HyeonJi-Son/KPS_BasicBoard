package com.example.backend.service.BasicBoard;

import com.example.backend.controller.request.BoardRequest;
import com.example.backend.entity.BasicBoard;
import com.example.backend.repository.BasicBoardRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.Basic;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class BasicBoardServiceImpl implements BasicBoardService {

    @Autowired
    BasicBoardRepository repository;
    // 등록, 목록, 상세보기, 수정, 삭제


    private String passwordEncode(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        /* MessageDigest 클래스의 getInstance() 메소드의 매개변수에 "SHA-256" 알고리즘 이름을 지정.
            해당 알고리즘에서 해시값을 계산하는 MessageDigest를 구할 수 있다.
         */

        md.update(password.getBytes()); // password를 byte형식으로 업데이트
        return String.format("%64x", new BigInteger(1, md.digest()));
              //64자리의 문자열 형태로 반환한다.
    }

    @Override
    public BasicBoard register (BoardRequest boardRequest) throws NoSuchAlgorithmException {
        //encodePassword 변수에 담는 값 = passwordEncode 함수가 작동하여 return된 값
        String encodePassword = this.passwordEncode(boardRequest.getPassword());

        //boardRequest의 password값 = encodePassword 로 변경.
        boardRequest.setPassword(encodePassword);

        BasicBoard basicBoardEntity = new BasicBoard(
                boardRequest.getBoardNo(), boardRequest.getTitle(), boardRequest.getWriter(),
                boardRequest.getContent(), boardRequest.getPassword()
        );
        //함수를 통해서 & 생성자를 통한 데이터 전달에는 순서가 중요하다.

        return repository.save(basicBoardEntity);
       //repository.save는 등록과 return을 함께 해준다.
        //public void register<방식으로 작성하는 경우 void는 return을 사용할 수 없으므로 등록만 사용하는 셈이 된다.
        //    <S extends T> S save(S entity);
        //이번 과제에서는 register 페이지에서 바로 게시글 상세보기로 이동하기 위해
        // 등록한 내용을 곧장 return할 필요가 있었다. 이와 같은 방식으로 작성할 수도 있다는 것을 알아두자.
    }

    @Override
    public List<BasicBoard> list (){
        return repository.findAll(Sort.by(Sort.Direction.DESC, "boardNo"));
        // repository의 모든 것을 찾아온다.
        //sort< 정렬한다는 뜻. ASC(오름차순)/DESC(내림차순). "boardNo"를 기준으로
        //잘 활용하여 boardNo 가 아닌 다른 것들을 기준으로 정렬한다면
        //베스트 게시글 등도 정렬할 수 있다.
    }
    @Override
    public BasicBoard read (Integer boardNo) {
        Optional<BasicBoard> readBoard = repository.findById(Long.valueOf(boardNo));
        /*
        repository에서 findById를 통해 가져온 값을 readBoard라고 한다.
        findById에서 기준이 되어줄 Id는 boardNo이다.

            Optional: null일 수도 있는 객체를 감싸는 일종의 Wrapper 클래스
            optional 변수 내부에는 null이 아닌 T 객체가 있을 수도 있고 null이 있을 수도 있습니다.
            따라서, Optional 클래스는 여러 가지 API를 제공하여 null일 수도 있는 객체를 다룰 수 있도록 돕습니다.

        Optional의 역할 덕분에 readBoard는 제대로 찾은 값을 갖고 있을 수도 있고 아무것도 찾지 못한 빈 객체일 수도 있다.

         */

        if(readBoard.equals(Optional.empty())) { //만약 readBoard가 empty와 같다면
            return null; //null을 return 해라
        }

        return readBoard.get(); //if에 걸리지 않는 경우 readBoard결과를 return
    }

//    @Override
//    public BasicBoard modify (BasicBoard basicBoard);

    @Override
    public void remove (Integer boardNo) {
        repository.deleteById(Long.valueOf(boardNo));
    };


}

package com.example.backend.repository;

import com.example.backend.entity.BasicBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BasicBoardRepository extends JpaRepository<BasicBoard, Long> {
    BasicBoard findByBoardNoAndPassword(Long boardNo, String password);

}

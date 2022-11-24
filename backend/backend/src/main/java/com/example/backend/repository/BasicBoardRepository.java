package com.example.backend.repository;

import com.example.backend.entity.BasicBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BasicBoardRepository extends JpaRepository<BasicBoard, Long> {
    BasicBoard findByBoardNoAndPassword(Long boardNo, String password);
}

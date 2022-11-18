package com.example.backend.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class BasicBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardNo;

    @Column(length = 128, nullable = false)
    //컬럼 길이는 꼭 정해주지 않아도 괜찮긴 하겠지만...
    private String title;

    @Column(length = 32, nullable = false)
    private String writer;

    @Lob //@Lob은 일반적인 데이터베이스에서 저장하는 길이인 255개 이상의 문자를 저장하고 싶을 때 지정한다.
    private String Content;

    @Column
    private String password;

    @CreationTimestamp
    private Date regDate;

    @UpdateTimestamp
    private Date upDates;

}

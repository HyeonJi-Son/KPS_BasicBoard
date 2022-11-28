package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberNo;

    @Column(length = 32, nullable = false)
    private String nickName;

    @Column(length = 128, nullable = false)
    private String email;

    @Column
    private String password;

    @Column
    private Integer role;

    @CreationTimestamp
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date regDate;

    @UpdateTimestamp
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date upDates;
}

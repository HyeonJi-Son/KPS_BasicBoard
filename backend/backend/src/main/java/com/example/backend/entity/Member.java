package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberNo;

    @Column(length = 32, nullable = false)
    private String nickName;

    @Column(length = 128, nullable = false, unique = true)
                                            //중복을 허용하지 않음
    private String email;

    @Column
    private String password;

    @Column
    private Integer role;

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="roleNo")
//    @JsonIgnore
//    private Role role;

    @CreationTimestamp
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date regDate;

    @UpdateTimestamp
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date upDates;

    public Member(String nickName, String email, String password, Integer role) {
        this.nickName = nickName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

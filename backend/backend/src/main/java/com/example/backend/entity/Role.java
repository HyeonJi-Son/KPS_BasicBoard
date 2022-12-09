package com.example.backend.entity;

import javax.persistence.*;

@Entity
public class Role {
    @Id
    private Integer roleNo;

    @Column(length = 32, nullable = false)
    private String roleName;

}

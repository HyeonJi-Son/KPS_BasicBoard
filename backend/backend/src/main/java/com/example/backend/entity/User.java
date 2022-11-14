package com.example.backend.entity;

//진짜 table아니고 axios 연동을 확인하기 위해 제작한 객체
public class User {
    int id;
    String username;
    String password;
    String email;

    public User(int id, String username, String password, String email) {
        super();
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password){ this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }



}

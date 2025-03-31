package com.example.demo.DTO;

// PostResponseDto.java
public class PostResponseDto {
    private String title;
    private String body;
    private String pinggyAuthHeader;

    // Constructor
    public PostResponseDto(String title, String body, String pinggyAuthHeader) {
        this.title = title;
        this.body = body;
        this.pinggyAuthHeader = pinggyAuthHeader;
    }

    // Getters
    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public String getPinggyAuthHeader() {
        return pinggyAuthHeader;
    }
}

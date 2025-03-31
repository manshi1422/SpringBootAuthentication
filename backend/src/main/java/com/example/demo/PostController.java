package com.example.demo;

import com.example.demo.DTO.PostRequestDto;
import com.example.demo.DTO.PostResponseDto;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

// PostController.java
@CrossOrigin(origins = "http://localhost:3000")
@RestController
//@CrossOrigin
public class PostController {

    private final List<PostResponseDto> posts = new ArrayList<>();

    @PostMapping("/post")
    public String createPost(@RequestBody PostRequestDto postRequest) {
        String authHeader = AuthHeaderHolder.getAuthHeader();
        posts.add(new PostResponseDto(postRequest.getTitle(), postRequest.getBody(), authHeader));
        return "Post created successfully";
    }

    @GetMapping("/list")
    public List<PostResponseDto> listPosts() {
        return new ArrayList<>(posts);
    }
}

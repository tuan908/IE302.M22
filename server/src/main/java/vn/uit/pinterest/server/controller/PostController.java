package vn.uit.pinterest.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vn.uit.pinterest.server.schema.Post;

@RestController
public class PostController {
    @GetMapping(value = "/api/post/get")
    public Post getPostById(@RequestParam String param) {
        return new Post();
    }

    @PostMapping(value = "/api/post/post")
    public Post createNewPost(@RequestBody Post entity) {
        // TODO: process POST request

        return entity;
    }

    @PutMapping(value = "/api/post/put/{id}")
    public Post updatePost(@PathVariable String id, @RequestBody Post entity) {
        // TODO: process PUT request

        return entity;
    }

}

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
    @GetMapping(value = "path")
    public Post getMethodName(@RequestParam String param) {
        return new Post();
    }

    @PostMapping(value = "path")
    public Post postMethodName(@RequestBody Post entity) {
        // TODO: process POST request

        return entity;
    }

    @PutMapping(value = "path/{id}")
    public Post putMethodName(@PathVariable String id, @RequestBody Post entity) {
        // TODO: process PUT request

        return entity;
    }

}

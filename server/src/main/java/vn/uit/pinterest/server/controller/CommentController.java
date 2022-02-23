package vn.uit.pinterest.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vn.uit.pinterest.server.schema.Comment;

@RestController
public class CommentController {
    @GetMapping(value = "path")
    public Comment getMethodName(@RequestParam String param) {
        return new Comment();
    }

    @PostMapping(value = "path")
    public Comment postMethodName(@RequestBody Comment entity) {
        // TODO: process POST request

        return entity;
    }

    @PutMapping(value = "path/{id}")
    public Comment putMethodName(@PathVariable String id, @RequestBody Comment entity) {
        // TODO: process PUT request

        return entity;
    }

}

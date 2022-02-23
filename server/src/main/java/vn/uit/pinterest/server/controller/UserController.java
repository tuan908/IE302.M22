package vn.uit.pinterest.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vn.uit.pinterest.server.schema.User;

@RestController
public class UserController {
    @GetMapping(value = "path")
    public User getMethodName(@RequestParam String param) {
        return new User();
    }

    @PostMapping(value = "path")
    public User postMethodName(@RequestBody User entity) {
        // TODO: process POST request

        return entity;
    }

    @PutMapping(value = "path/{id}")
    public User putMethodName(@PathVariable String id, @RequestBody User entity) {
        // TODO: process PUT request

        return entity;
    }

}

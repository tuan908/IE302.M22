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
    @GetMapping(value = "/api/user/get")
    public User getUserInfo(@RequestParam String param) {
        return new User();
    }

    @PostMapping(value = "/api/user/create")
    public User createNewUserInfo(@RequestBody User entity) {
        // TODO: process POST request

        return entity;
    }

    @PutMapping(value = "/api/user/update/{id}")
    public User updateExistedUserInfo(@PathVariable String id, @RequestBody User entity) {
        // TODO: process PUT request

        return entity;
    }

}

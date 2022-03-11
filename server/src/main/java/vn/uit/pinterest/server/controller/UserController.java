package vn.uit.pinterest.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vn.uit.pinterest.server.repo.UserRepository;
import vn.uit.pinterest.server.schema.User;

@RestController
public class UserController {
    @Autowired
    public MongoOperations mongoOperations;

    @Autowired
    public UserRepository userRepository;

    @Transactional(rollbackFor = Exception.class)
    @GetMapping(value = "/api/users/get")
    public ResponseEntity<?> getUsersInfo() {
        List<User> users = userRepository.findAll();
        if (users != null) {
            new ResponseEntity<List<User>>(HttpStatus.OK);
            return ResponseEntity.status(200).body(users);
        } else {
            new ResponseEntity<List<User>>(HttpStatus.NOT_FOUND);
            return ResponseEntity.status(400).body("Not found any user");
        }

    }

    @Transactional(rollbackFor = Exception.class)
    @GetMapping(value = "/api/user/get")
    public ResponseEntity<?> getUserInfo(@RequestParam(name = "userId") String userId) {
        User userInfoExist = mongoOperations.findById(userId, User.class);

        if (userInfoExist != null) {
            new ResponseEntity<User>(HttpStatus.OK);
            return ResponseEntity.ok(userInfoExist);
        } else {
            new ResponseEntity<User>(HttpStatus.NOT_FOUND);
            return ResponseEntity.status(404).body("Not found any user");
        }

    }

    @Transactional(rollbackFor = Exception.class)
    @PostMapping(value = "/api/user/create")
    public ResponseEntity<?> createNewUserInfo(@RequestBody User user) {
        if (user != null) {
            User newUser = new User();
            newUser.postId = user.postId;
            newUser.avatarUrl = user.avatarUrl;
            newUser.ownerName = user.ownerName;
            newUser.postContent = user.postContent;

            userRepository.save(newUser);
            new ResponseEntity<User>(HttpStatus.OK);
            return ResponseEntity.status(200).body(newUser);
        } else {
            new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            return ResponseEntity.status(400).body("Bad request");
        }
    }

    @PutMapping(value = "/api/user/update")
    public ResponseEntity<?> updateExistedUserInfo(@RequestParam(name = "userId") String id, @RequestBody User entity) {
        User requestedUpdateInfoUser = mongoOperations.findById(id, User.class);

        if (requestedUpdateInfoUser != null) {
            requestedUpdateInfoUser.avatarUrl = entity.avatarUrl;
            requestedUpdateInfoUser.ownerName = entity.ownerName;
            requestedUpdateInfoUser.postContent = entity.postContent;
            mongoOperations.save(requestedUpdateInfoUser);

            new ResponseEntity<User>(HttpStatus.OK);
            return ResponseEntity.status(200).body(requestedUpdateInfoUser);
        } else {
            new ResponseEntity<User>(HttpStatus.NOT_FOUND);
            return ResponseEntity.status(404).body("User can't not found");
        }

    }

}

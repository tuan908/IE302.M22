package vn.uit.pinterest.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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

import vn.uit.pinterest.server.repo.PostRepo;
import vn.uit.pinterest.server.schema.Post;

@RestController
public class PostController {
    @Autowired
    public MongoOperations mongoOperations;

    @Autowired
    public PostRepo postRepo;

    @GetMapping(value = "/api/post/get")
    public ResponseEntity<?> getPostById(@RequestParam(name = "postId") String postId) {
        if (postId != null) {
            Query findPostByIdQuery = new Query(Criteria.where(postId));
            Post post = mongoOperations.findOne(findPostByIdQuery, Post.class);
            if (post != null) {
                new ResponseEntity<Post>(HttpStatus.OK);
                return ResponseEntity.status(200).body(post);
            } else {
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
                return ResponseEntity.status(404).body("Not found any post");
            }
        } else {
            new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            return ResponseEntity.status(400).body("Bad request");
        }
    }

    @Transactional(rollbackFor = Exception.class)
    @PostMapping(value = "/api/post/create")
    public ResponseEntity<?> createNewPost(@RequestBody Post post) {
        if (post != null) {
            postRepo.save(post);
            new ResponseEntity<Post>(HttpStatus.OK);
            return ResponseEntity.status(200).body(post);
        } else {
            new ResponseEntity<Post>(HttpStatus.BAD_REQUEST);
            return ResponseEntity.status(400).body("Bad Request");
        }

    }

    @PutMapping(value = "/api/post/put/{id}")
    public Post updatePost(@PathVariable String id, @RequestBody Post entity) {
        // TODO: process PUT request

        return entity;
    }

}

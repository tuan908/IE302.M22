package vn.uit.pinterest.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
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
import org.springframework.web.bind.annotation.RestController;

import vn.uit.pinterest.server.entity.Post;
import vn.uit.pinterest.server.repository.PostRepository;

@RestController
public class PostController {
    @Autowired
    public MongoTemplate mongoTemplate;

    @Autowired
    public PostRepository postRepo;

    @GetMapping(value = "/api/post/{postId}/get")
    public ResponseEntity<?> getPostById(@PathVariable String postId) {
        if (postId != null) {
            Query findPostByIdQuery = new Query(Criteria.where("_id").is(postId));
            Post post = mongoTemplate.findOne(findPostByIdQuery, Post.class);

            if (post != null) {
                new ResponseEntity<Post>(HttpStatus.OK);
                return ResponseEntity.status(200).body(post);
            } else {
                new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
                return ResponseEntity.status(404).body("Not found any post");
            }
        } else {
            new ResponseEntity<Post>(HttpStatus.BAD_REQUEST);
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

    @Transactional(rollbackFor = Exception.class)
    @PutMapping(value = "/api/post/{postId}/update")
    public ResponseEntity<?> updatePost(@PathVariable String postId, @RequestBody Post updatedPost) {
        Post post = postRepo.findByPostId(postId);

        if (post != null) {
            if (updatedPost != null) {
                post.setPostReactCount(updatedPost.getPostReactCount());
                post.setPostStatus(updatedPost.getPostStatus());
                post.setPostUrl(updatedPost.getPostUrl());
                post.setImage(updatedPost.getImage());

                postRepo.save(post);

                new ResponseEntity<Post>(HttpStatus.OK);
                return ResponseEntity.status(200).body(post);
            } else {
                new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                return ResponseEntity.status(400).body("Bad request!!!");
            }

        } else {
            new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
            return ResponseEntity.status(404).body("Not found any post!!!");

        }

    }

}

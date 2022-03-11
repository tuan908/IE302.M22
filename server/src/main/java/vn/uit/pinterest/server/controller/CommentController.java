package vn.uit.pinterest.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vn.uit.pinterest.server.repo.CommentRepo;
import vn.uit.pinterest.server.schema.Comment;

@RestController
public class CommentController {
    @Autowired
    private MongoOperations mongoOperations;

    @Autowired
    CommentRepo repo;

    @Autowired
    MongoTemplate mongoTemplate;

    @Transactional(rollbackFor = Exception.class)
    @RequestMapping("/api/comments/get")
    public ResponseEntity<?> getComments() {
        List<Comment> comments = mongoOperations.findAll(Comment.class);
        if (comments.isEmpty()) {
            new ResponseEntity<Comment>(HttpStatus.NOT_FOUND);
            return ResponseEntity.status(400).body("Not found any comment");
        } else {
            new ResponseEntity<Comment>(HttpStatus.OK);
            return ResponseEntity.status(200).body(comments);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    @PostMapping(value = "/api/comment/create")
    public ResponseEntity<?> postNewComment(@RequestBody Comment comment) {
        if (comment != null) {
            Comment newComment = mongoOperations.save(comment);
            new ResponseEntity<Comment>(HttpStatus.OK);
            return ResponseEntity.status(200).body(newComment);
        } else {
            new ResponseEntity<Comment>(HttpStatus.BAD_REQUEST);
            return ResponseEntity.status(400).body("Bad request");
        }
    }

    @Transactional(rollbackFor = Exception.class)
    @PutMapping(value = "/api/comment/put")
    public ResponseEntity<?> updateExistedComment(@RequestParam(name = "commentId") String commentId,
            @RequestBody Comment comment) {
        if (commentId != null) {
            Query updateQuery = new Query(Criteria.where(commentId));
            Update update = new Update();
            update.set("avatarUrl", comment.avatarUrl);
            update.set("commentContent", comment.commentContent);

            mongoTemplate.updateFirst(updateQuery, update, Comment.class);
            new ResponseEntity<>(HttpStatus.OK);
            return ResponseEntity.status(200).body(comment);
        } else {
            new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            return ResponseEntity.status(400).body("Bad request");
        }

    }

    @Transactional(rollbackFor = Exception.class)
    @DeleteMapping(value = "/api/comment/delete")
    public ResponseEntity<?> deleteCommentById(@RequestParam(name = "commentId") String commentId) {
        if (commentId != null) {
            Query deleteCommentByIdQuery = new Query(Criteria.where(commentId));
            mongoOperations.findAndRemove(deleteCommentByIdQuery, Comment.class);
            new ResponseEntity<>(HttpStatus.OK);
            return ResponseEntity.status(200).body("Comment deleted");
        } else {
            new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            return ResponseEntity.status(400).body("Bad request");
        }

    }

}

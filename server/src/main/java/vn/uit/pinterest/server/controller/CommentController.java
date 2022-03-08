package vn.uit.pinterest.server.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import vn.uit.pinterest.server.repo.CommentRepo;
import vn.uit.pinterest.server.schema.Comment;

@RestController
public class CommentController {
    public CommentRepo commentRepo;

    @Autowired
    MongoTemplate mongoTemplate;

    @Transactional(rollbackFor = Exception.class)
    @RequestMapping("/api/comments/get")

    public List<Comment> getComments() {
        return commentRepo.findAll();
    }

    @Transactional(rollbackFor = Exception.class)
    @RequestMapping("/")

    public List<Comment> getCommentsDemo() {
        return commentRepo.findAll();
    }

    @Transactional(rollbackFor = Exception.class)
    @ResponseBody
    @PostMapping(value = "/api/comment/post")
    public Optional<Comment> postNewComment(@RequestBody Comment entity) {
        Comment newComment = commentRepo.save(entity);
        return commentRepo.findById(newComment.commentId);
    }

    @Transactional(rollbackFor = Exception.class)
    @PutMapping(value = "/api/comment/put/{id}")
    public Comment updateExistedComment(@PathVariable String id, @RequestBody Comment entity) {
        Query updateQuery = new Query(Criteria.where(id));
        Update update = new Update();
        update.set("avatarUrl", entity.avatarUrl);
        update.set("commentContent", entity.commentContent);

        mongoTemplate.updateFirst(updateQuery, update, Comment.class);

        return mongoTemplate.findById(id, Comment.class);

    }

    @Transactional(rollbackFor = Exception.class)
    @DeleteMapping(value = "/api/comment/delete/{id}")
    public void deleteCommentById(String commentId) {
        commentRepo.deleteById(commentId);
    }

}

package vn.uit.pinterest.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import vn.uit.pinterest.server.entity.Comment;

@Repository
public interface CommentRepo extends MongoRepository<Comment, String> {
}

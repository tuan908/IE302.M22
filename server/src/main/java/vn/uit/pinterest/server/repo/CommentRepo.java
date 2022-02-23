package vn.uit.pinterest.server.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import vn.uit.pinterest.server.schema.Comment;

@Repository
public interface CommentRepo extends MongoRepository<Comment, Long> {

}

package vn.uit.pinterest.server.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import vn.uit.pinterest.server.entity.Comment;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
	
    @Query("{'img_id': ?0}")
    Optional<List<Comment>> findAllByImageId(String imageId);

    @Query("{'_id': ?0}")
    Optional<Comment> findOneById(String id);
}

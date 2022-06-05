package vn.uit.pinterest.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import vn.uit.pinterest.server.entity.Post;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
	@Query("{'postId': ?0}")
	Post findByPostId(String postId);
}

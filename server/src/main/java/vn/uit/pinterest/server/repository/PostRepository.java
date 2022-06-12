package vn.uit.pinterest.server.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import vn.uit.pinterest.server.entity.Post;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
	@Query("{'_id': ?0}")
	Post findByPostId(String postId);

	@Query("{'username': ?0}")
	List<Post> findPostsByUser(String username);

}

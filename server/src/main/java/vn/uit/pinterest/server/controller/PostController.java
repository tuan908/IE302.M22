package vn.uit.pinterest.server.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import vn.uit.pinterest.server.dto.MessageResponse;
import vn.uit.pinterest.server.dto.PostDto;
import vn.uit.pinterest.server.entity.Post;
import vn.uit.pinterest.server.entity.User;
import vn.uit.pinterest.server.repository.PostRepository;
import vn.uit.pinterest.server.repository.UserRepository;

@RestController
public class PostController {
	
	@Autowired
	public MongoTemplate mongoTemplate;

	@Autowired
	public PostRepository postRepository;

	@Autowired
	private UserRepository userRepository;

	MessageResponse badRequestMsg = new MessageResponse("Bad request.");
	MessageResponse notFoundMsg = new MessageResponse("Not found any post with your request");

	@Transactional(rollbackFor = Exception.class)
	@GetMapping(value = "/api/post/{postId}/get")
	public ResponseEntity<?> getPostById(@PathVariable String postId) {
		if (postId != null) {
			Query findPostByIdQuery = new Query(Criteria.where("post_id").is(postId));
			Post post = mongoTemplate.findOne(findPostByIdQuery, Post.class);

			if (post != null) {
				PostDto response = new PostDto();

				response.setImage(post.getImage());
				response.setPostId(post.getPostId());
				response.setPostReactCount(post.getPostReactCount());
				response.setPostStatus(post.getPostStatus());
				response.setUser(post.getUser());
				response.setPostUrl(post.getPostUrl());

				return ResponseEntity.status(200).body(response);
			} else {
				return ResponseEntity.status(404).body(notFoundMsg);
			}
		} else {
			return ResponseEntity.status(400).body(badRequestMsg);
		}
	}

	@Transactional(rollbackFor = Exception.class)
	@PostMapping(value = "/api/post/create")
	public ResponseEntity<?> createNewPost(@RequestBody PostDto request) {
		if (request != null) {
			User user = userRepository.findByUsername(request.getUser());
			if (user != null) {
				Post newPost = new Post();
				PostDto response = new PostDto();

				newPost.setImage(request.getImage());
				newPost.setPostReactCount(request.getPostReactCount());
				newPost.setPostStatus(request.getPostStatus());
				newPost.setUser(request.getUser());
				newPost.setCreatedTime(Instant.now());
				newPost.setContent(request.getContent());
				newPost.setPostTitle(request.getTitle());

				List<Post> posts = new ArrayList<>();
				posts.add(newPost);
				user.setPosts(posts);
				userRepository.save(user);

				postRepository.save(newPost);

				response.setCreatedTime(Instant.now());
				response.setImage(request.getImage());
				response.setPostReactCount(request.getPostReactCount());
				response.setPostStatus(request.getPostStatus());
				response.setPostId(newPost.getPostId());
				response.setContent(request.getContent());
				response.setTitle(request.getTitle());
				response.setUser(request.getUser());
				response.setPostId(newPost.getPostId());

				return ResponseEntity.status(200).body(response);
			}

			return ResponseEntity.status(400).body(badRequestMsg);
		} else {
			return ResponseEntity.status(400).body(badRequestMsg);
		}

	}

	@Transactional(rollbackFor = Exception.class)
	@PutMapping(value = "/api/post/{postId}/update")
	public ResponseEntity<?> updatePost(@PathVariable String postId, @RequestBody PostDto updatedPost) {
		Post post = postRepository.findByPostId(postId);

		if (post != null) {
			if (updatedPost != null) {
				post.setPostReactCount(updatedPost.getPostReactCount());
				post.setPostStatus(updatedPost.getPostStatus());
				post.setPostUrl(updatedPost.getPostUrl());
				post.setImage(updatedPost.getImage());

				postRepository.save(post);

				PostDto response = new PostDto();

				response.setCreatedTime(Instant.now());
				response.setImage(post.getImage());
				response.setPostReactCount(post.getPostReactCount());
				response.setPostStatus(post.getPostStatus());
				response.setUser(post.getUser());
				response.setUpdatedTime(Instant.now());
				response.setPostId(postId);

				return ResponseEntity.status(200).body(response);
			} else {
				return ResponseEntity.status(400).body(badRequestMsg);
			}

		} else {

			return ResponseEntity.status(404).body(notFoundMsg);

		}

	}

}

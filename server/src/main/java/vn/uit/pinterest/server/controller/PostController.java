package vn.uit.pinterest.server.controller;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.uit.pinterest.server.dto.MessageResponse;
import vn.uit.pinterest.server.dto.PostDto;
import vn.uit.pinterest.server.entity.Post;
import vn.uit.pinterest.server.entity.User;
import vn.uit.pinterest.server.repository.PostRepository;
import vn.uit.pinterest.server.repository.UserRepository;

@RestController
@RequestMapping("/api/post/")
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
	@GetMapping(value = "{postId}/get")
	public ResponseEntity<?> getPostById(@PathVariable String postId) {
		Optional<Post> result = postRepository.findById(postId);
		
		if (result.isPresent()) {
			PostDto response = new PostDto();

			response.setBase64ImageString(result.get().getBase64ImageString());
			response.setPostId(result.get().getPostId());
			response.setPostReactCount(result.get().getPostReactCount());
			response.setPostStatus(result.get().getPostStatus());
			response.setEmail(result.get().getUsername());
			response.setPostUrl(result.get().getPostUrl());

			return ResponseEntity.status(200).body(response);
		} else {
			return ResponseEntity.status(404).body(notFoundMsg);
		}
	}

	@Transactional(rollbackFor = Exception.class)
	@PostMapping(value = "create")
	public ResponseEntity<?> createNewPost(@RequestBody PostDto request) {

		Optional<User> user = userRepository.findByEmail(request.getEmail());
		if (user.isPresent()) {
			User existedUser = user.get();
			Optional<List<Post>> result = postRepository.findPostsByUser(request.getEmail());
			if (result.isEmpty()) {
				Post newPost = new Post();

				String base64Str = request.getBase64ImageString() == "" ? "" : request.getBase64ImageString();
				String imgUrlFromSave = request.getImgUrlFromSave() != "" ? request.getBase64ImageString() : "";

				newPost.setBase64ImageString(base64Str);
				newPost.setBase64ImageString(request.getBase64ImageString());
				newPost.setPostReactCount(request.getPostReactCount());
				newPost.setPostStatus(request.getPostStatus());
				newPost.setUsername(request.getEmail());
				newPost.setCreatedTime(Instant.now());
				newPost.setContent(request.getContent());
				newPost.setPostTitle(request.getTitle());
				newPost.setCategory(request.getCategory());
				newPost.setAuthor(request.getAuthor());
				newPost.setImgUrlFromSave(imgUrlFromSave);

				result.get().add(newPost);
				postRepository.save(newPost);

				existedUser.setPosts(result.get());
				userRepository.save(existedUser);
			} else {
				Post newPost = new Post();
				String base64Str = request.getBase64ImageString() == "" ? "" : request.getBase64ImageString();
				String imgUrlFromSave = request.getImgUrlFromSave() == "" ? "" : request.getImgUrlFromSave();
				newPost.setBase64ImageString(base64Str);
				newPost.setPostReactCount(request.getPostReactCount());
				newPost.setPostStatus(request.getPostStatus());
				newPost.setUsername(request.getEmail());
				newPost.setCreatedTime(Instant.now());
				newPost.setContent(request.getContent());
				newPost.setPostTitle(request.getTitle());
				newPost.setCategory(request.getCategory());
				newPost.setAuthor(request.getAuthor());
				newPost.setImgUrlFromSave(imgUrlFromSave);

				result.get().add(newPost);
				postRepository.save(newPost);

				existedUser.setPosts(result.get());
				userRepository.save(existedUser);
			}

			return ResponseEntity.status(200).body(new MessageResponse("Save post successfully"));
		}

		return ResponseEntity.status(400).body(badRequestMsg);
	}

	@Transactional(rollbackFor = Exception.class)
	@PutMapping(value = "{postId}/update")
	public ResponseEntity<?> updatePost(@PathVariable String postId, @RequestBody PostDto updatedPost) {
		Optional<Post> post = postRepository.findByPostId(postId);

		if (post.isPresent()) {

			post.get().setPostReactCount(updatedPost.getPostReactCount());
			post.get().setPostStatus(updatedPost.getPostStatus());
			post.get().setPostUrl(updatedPost.getPostUrl());
			post.get().setBase64ImageString(updatedPost.getBase64ImageString());

			postRepository.save(post.get());

			PostDto response = new PostDto();

			response.setCreatedTime(Instant.now());
			response.setBase64ImageString(post.get().getBase64ImageString());
			response.setPostReactCount(post.get().getPostReactCount());
			response.setPostStatus(post.get().getPostStatus());
			response.setEmail(post.get().getUsername());
			response.setUpdatedTime(Instant.now());
			response.setPostId(postId);

			return ResponseEntity.status(200).body(response);
		} else {
			return ResponseEntity.status(400).body(badRequestMsg);
		}

	}

}

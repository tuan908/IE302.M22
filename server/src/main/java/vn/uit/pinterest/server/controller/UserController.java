package vn.uit.pinterest.server.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.uit.pinterest.server.dto.MessageResponse;
import vn.uit.pinterest.server.dto.UserDto;
import vn.uit.pinterest.server.entity.Post;
import vn.uit.pinterest.server.entity.User;
import vn.uit.pinterest.server.repository.UserRepository;

@RestController
@RequestMapping("/api/user/")
public class UserController {
	@Autowired
	public UserRepository userRepository;

	@Transactional(rollbackFor = Exception.class)
	@GetMapping(value = "{userId}/get")
	public ResponseEntity<?> getUserInfo(@PathVariable(name = "userId") String userId) {
		Optional<User> result = userRepository.findById(userId);

		if (result.isPresent()) {
			String avatarUrl = result.get().getAvatarUrl();
			String email = result.get().getEmail();
			String username = result.get().getName();
			String id = result.get().getUserId().toString();
			List<Post> posts = result.get().getPosts();
			UserDto userInfo = new UserDto(avatarUrl, email, username, id, posts);
			return ResponseEntity.ok().body(userInfo);
		} else {
			return ResponseEntity.status(404).body("Not found any user");
		}

	}

	@PutMapping(value = "{userId}/update")
	public ResponseEntity<?> update(@PathVariable(name = "userId") String userId, @RequestBody User request) {
		Optional<User> result = userRepository.findById(userId);

		if (result.isPresent()) {
			result.get().setAvatarUrl(request.getAvatarUrl());
			userRepository.save(result.get());

			User response = result.get();

			return ResponseEntity.status(200).body(response);
		} else {
			return ResponseEntity.status(404).body(new MessageResponse("User did't found."));
		}

	}

}

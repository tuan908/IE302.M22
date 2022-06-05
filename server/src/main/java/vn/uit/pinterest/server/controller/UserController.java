package vn.uit.pinterest.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.uit.pinterest.server.dto.UserDto;
import vn.uit.pinterest.server.entity.User;
import vn.uit.pinterest.server.repository.UserRepository;

@RestController
@RequestMapping("/api/user/")
public class UserController {
	@Autowired
	public MongoOperations mongoOperations;

	@Autowired
	public UserRepository userRepository;

	@Transactional(rollbackFor = Exception.class)
	@GetMapping(value = "{userId}/get")
	public ResponseEntity<?> getUserInfo(@PathVariable(name = "userId") String userId) {
		User userInfoExist = mongoOperations.findById(userId, User.class);

		if (userInfoExist != null) {
			UserDto userInfo = new UserDto(userInfoExist.getAvatarUrl(), userInfoExist.getEmail(),
					userInfoExist.getUserName(), userInfoExist.getUserId().toString());
			new ResponseEntity<User>(HttpStatus.OK);
			return ResponseEntity.ok(userInfo);
		} else {
			new ResponseEntity<User>(HttpStatus.NOT_FOUND);
			return ResponseEntity.status(404).body("Not found any user");
		}

	}

	@PutMapping(value = "{userId}/update")
	public ResponseEntity<?> update(@PathVariable(name = "userId") String id, @RequestBody User entity) {
		User requestedUpdateInfoUser = mongoOperations.findById(id, User.class);

		if (requestedUpdateInfoUser != null) {
			requestedUpdateInfoUser.avatarUrl = entity.avatarUrl;
			mongoOperations.save(requestedUpdateInfoUser);

			new ResponseEntity<User>(HttpStatus.OK);
			return ResponseEntity.status(200).body(requestedUpdateInfoUser);
		} else {
			new ResponseEntity<User>(HttpStatus.NOT_FOUND);
			return ResponseEntity.status(404).body("User can't not found");
		}

	}

}

package vn.uit.pinterest.server.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.uit.pinterest.server.common.ERole;
import vn.uit.pinterest.server.common.JwtUtils;
import vn.uit.pinterest.server.dto.JwtResponse;
import vn.uit.pinterest.server.dto.LoginRequest;
import vn.uit.pinterest.server.dto.MessageResponse;
import vn.uit.pinterest.server.dto.SignupRequest;
import vn.uit.pinterest.server.entity.Role;
import vn.uit.pinterest.server.entity.User;
import vn.uit.pinterest.server.repository.RoleRepo;
import vn.uit.pinterest.server.repository.UserRepository;
import vn.uit.pinterest.server.service.UserDetailsImplement;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepo repo;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/login")
	public ResponseEntity<?> authUser(@Validated @RequestBody LoginRequest jwtRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = jwtUtils.generateToken(authentication);

		UserDetailsImplement userDetailsImplement = (UserDetailsImplement) authentication.getPrincipal();
		List<String> roles = userDetailsImplement.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		new ResponseEntity<JwtResponse>(HttpStatus.OK);
		return ResponseEntity.ok().body(
				new JwtResponse(token, userDetailsImplement.getUsername(), userDetailsImplement.getPassword(), roles));
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@Validated @RequestBody SignupRequest signupRequest) {

		if (userRepository.existsByUserName(signupRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("User already existed"));
		}

		User user = new User(signupRequest.getUsername(), signupRequest.getPassword());

		Set<String> roleStr = signupRequest.getRoles();
		Set<Role> roles = new HashSet<Role>();

		if (roleStr == null) {
			Role userRole = repo.findByRoleName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role didn't found"));
			roles.add(userRole);
		} else {
			roleStr.forEach(role -> {
				Role adminRole = repo.findByRoleName(ERole.ROLE_ADMIN)
						.orElseThrow(() -> new RuntimeException("Error: Role din't found"));
				roles.add(adminRole);
			});
			user.setRoles(roles);
			userRepository.save(user);
		}

		return ResponseEntity.ok().body("Register successfully");

	}
}

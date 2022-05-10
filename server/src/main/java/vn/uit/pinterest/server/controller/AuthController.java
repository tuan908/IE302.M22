package vn.uit.pinterest.server.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vn.uit.pinterest.server.common.IRole;
import vn.uit.pinterest.server.common.JwtUtils;
import vn.uit.pinterest.server.dto.JwtResponse;
import vn.uit.pinterest.server.dto.LoginRequest;
import vn.uit.pinterest.server.dto.MessageResponse;
import vn.uit.pinterest.server.dto.RegisterRequest;
import vn.uit.pinterest.server.entity.Role;
import vn.uit.pinterest.server.entity.User;
import vn.uit.pinterest.server.repository.RoleRepo;
import vn.uit.pinterest.server.repository.UserRepository;
import vn.uit.pinterest.server.service.UserDetailsImplement;
import vn.uit.pinterest.server.service.UserDetailsServiceImplement;
import vn.uit.pinterest.server.service.UserService;

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
	JwtUtils jwtUtils;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	UserDetailsServiceImplement userDetailsServiceImplement;

	@Autowired
	UserService userService;

	// @Autowired
	// JavaMailSender mailSender;

	@GetMapping("/login")
	public ResponseEntity<?> login(@Validated @RequestBody LoginRequest request) {
		String username = request.getUsername();
		String password = request.getPassword();

		UsernamePasswordAuthenticationToken userAuthToken = new UsernamePasswordAuthenticationToken(username, password);
		Authentication authentication = authenticationManager.authenticate(userAuthToken);
		SecurityContextHolder.getContext().setAuthentication(userAuthToken);

		String token = jwtUtils.generateToken(authentication);

		UserDetailsImplement userDetailsImplement = (UserDetailsImplement) authentication.getPrincipal();
		List<String> roles = userDetailsImplement.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		final String TOKEN_TYPE = "Jwt Token";

		JwtResponse responseBody = new JwtResponse(token, TOKEN_TYPE, userDetailsImplement.getUsername(), roles);

		new ResponseEntity<JwtResponse>(HttpStatus.OK);
		return ResponseEntity.ok().body(responseBody);
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@Validated @RequestBody RegisterRequest registerRequest) {

		Boolean isUserExists = userRepository.existsByUserName(registerRequest.getUsername());

		if (!isUserExists) {
			String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());

			User user = new User(registerRequest.getUsername(), encodedPassword);

			Set<String> roleStr = registerRequest.getRoles();
			Set<Role> roles = new HashSet<Role>();

			if (roleStr == null) {
				Role userRole = repo.findByRoleName(IRole.ROLE_USER)
						.orElseThrow(() -> new RuntimeException("Error: Role didn't found"));
				roles.add(userRole);
			} else {
				roleStr.forEach(role -> {
					Role adminRole = repo.findByRoleName(IRole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role din't found"));
					roles.add(adminRole);
				});
			}

			user.setRoles(roles);
			userRepository.save(user);
		}

		else {
			MessageResponse badMessRes = new MessageResponse("User already existed");
			return ResponseEntity.badRequest().body(badMessRes);
		}

		MessageResponse successMessRes = new MessageResponse("Register successfully");
		return ResponseEntity.ok().body(successMessRes);
	}

	// @PutMapping("/forgot")
	// public ResponseEntity<?> forgot(@RequestParam("username") String username ) {
	// User user = userRepository.findByUsername(username);
	// if (user == null) {
	// return ResponseEntity.status(400).body(new MessageResponse("Can't find user"
	// + username));
	// }
	// String resetToken = UUID.randomUUID().toString();
	// userService.createForgotPasswordToken(user, resetToken);
	// String MAIL_SUBJECT = "Reset your password";
	// SimpleMailMessage mail = userService.createEmail(MAIL_SUBJECT, resetToken,
	// user);
	// mailSender.send(mail);
	// return ResponseEntity.ok("Successfully sent reset password mail!!!");
	// }
}

package vn.uit.pinterest.server.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.uit.pinterest.server.common.JwtUtils;
import vn.uit.pinterest.server.common.UserRole;
import vn.uit.pinterest.server.dto.AuthenticationResponse;
import vn.uit.pinterest.server.dto.JwtResponse;
import vn.uit.pinterest.server.dto.LoginRequest;
import vn.uit.pinterest.server.dto.MessageResponse;
import vn.uit.pinterest.server.dto.RegisterRequest;
import vn.uit.pinterest.server.entity.RefreshToken;
import vn.uit.pinterest.server.entity.Role;
import vn.uit.pinterest.server.entity.User;
import vn.uit.pinterest.server.repository.UserRepository;
import vn.uit.pinterest.server.repository.UserRoleRepository;
import vn.uit.pinterest.server.service.RefreshTokenService;
import vn.uit.pinterest.server.service.implement.UserDetailsImplement;
import vn.uit.pinterest.server.service.implement.UserDetailsServiceImplement;
import vn.uit.pinterest.server.service.implement.UserServiceImplement;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class AuthenticationController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserRoleRepository repo;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	UserDetailsServiceImplement userDetailsServiceImplement;

	@Autowired
	UserServiceImplement userService;

	@Autowired
	RefreshTokenService refreshTokenService;

	// @Autowired
	// JavaMailSender mailSender;

	@PostMapping("/login")
	public ResponseEntity<?> login(@Validated @RequestBody LoginRequest request) {
		String email = request.getEmail();
		String password = request.getPassword();

		UsernamePasswordAuthenticationToken userAuthToken = new UsernamePasswordAuthenticationToken(email, password);
		Authentication authentication = authenticationManager.authenticate(userAuthToken);
		SecurityContextHolder.getContext().setAuthentication(userAuthToken);

		String token = jwtUtils.generateToken(authentication);

		UserDetailsImplement userDetailsImplement = (UserDetailsImplement) authentication.getPrincipal();
		List<String> roles = userDetailsImplement.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		String usernameToCreateRefreshToken = userDetailsImplement.getUsername();

		RefreshToken refreshToken = refreshTokenService.create(usernameToCreateRefreshToken);
		final int TOKEN_EXPIRED_TIME = refreshToken.getTokenExpiredTime();
		Optional<User> user = userRepository.findByEmail(email);

		if (user.isPresent()) {
			ObjectId userId = user.get().getUserId();
			JwtResponse responseBody = new JwtResponse(token, refreshToken.getToken(), userId.toString(), email,
					roles, TOKEN_EXPIRED_TIME);
			return ResponseEntity.ok().body(responseBody);
		}
		return ResponseEntity.status(401).body(new MessageResponse("Not authorized"));

	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@Validated @RequestBody RegisterRequest registerRequest) {

		Boolean isUserExists = userRepository.existsByEmail(registerRequest.getEmail());

		if (!isUserExists) {
			String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());

			User user = new User(registerRequest.getEmail(), registerRequest.getUsername(), encodedPassword);

			Set<String> roleStr = registerRequest.getRoles();
			Set<Role> roles = new HashSet<Role>();

			if (roleStr == null) {
				Role userRole = repo.findByRoleName(UserRole.ROLE_USER)
						.orElseThrow(() -> new RuntimeException("Error: Role didn't found"));
				roles.add(userRole);
			} else {
				roleStr.forEach(role -> {
					Role adminRole = repo.findByRoleName(UserRole.ROLE_ADMIN)
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

	@GetMapping(value = "/token/refresh")
	public ResponseEntity<?> refreshToken(HttpServletRequest request) throws Exception {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			String token = bearerToken.substring(7, bearerToken.length());
			Boolean isValidToken = jwtUtils.validate(token);
			if (!isValidToken) {

				String username = jwtUtils.getUserNameFromJwtToken(bearerToken);
				UserDetails userDetails = userDetailsServiceImplement.loadUserByUsername(username);
				UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				String refreshToken = jwtUtils.generateToken(authenticationToken);
				return ResponseEntity.ok().body(new AuthenticationResponse(refreshToken));
			}
		}
		return null;

	}

}

package vn.uit.pinterest.server.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import vn.uit.pinterest.server.entity.RefreshToken;
import vn.uit.pinterest.server.entity.User;
import vn.uit.pinterest.server.exception.TokenRefreshException;
import vn.uit.pinterest.server.repository.RefreshTokenRepository;
import vn.uit.pinterest.server.repository.UserRepository;

@Service
public class RefreshTokenService {

	@Value("${tuanna.app.refreshTokenTimeInMs}")
	private Long refreshTokenDuration;

	@Autowired
	private RefreshTokenRepository refreshTokenRepository;

	@Autowired
	private UserRepository userRepository;

	public Optional<RefreshToken> findByToken(String token) {
		return refreshTokenRepository.findByToken(token);
	}

	public RefreshToken create(String email) {
		RefreshToken token = new RefreshToken();
		Optional<User> existedUser = userRepository.findByEmail(email);

		if (existedUser.isPresent()) {
			token.setUser(existedUser.get());
			token.setExpiredDate(Instant.now().plusMillis(refreshTokenDuration));
			token.setToken(UUID.randomUUID().toString());
			token = refreshTokenRepository.save(token);

			return token;
		}
		return null;
	}

	public RefreshToken verifyIfExpired(RefreshToken token) {
		if (token.getExpiredDate().compareTo(Instant.now()) < 0) {
			refreshTokenRepository.delete(token);
			throw new TokenRefreshException(token.getToken(), "Refresh token is expired");
		}
		return token;
	}

}

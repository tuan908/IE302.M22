package vn.uit.pinterest.server.common;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import vn.uit.pinterest.server.service.implement.UserDetailsImplement;

/**
 * JwtUtils
 */
@Service
public class JwtUtils {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

	private String jwtSecret;

	private int jwtExpirationMs;

	@Value("${tuanna.app.jwtSecret}")
	public void setJwtSecret(String secret) {
		this.jwtSecret = secret;
	}

	@Value("${tuanna.app.jwtExpirationTimeInMs}")
	public void setJwtExpirationMs(int ms) {
		this.jwtExpirationMs = ms;
	}

	@Value("${tuanna.app.refreshTokenTimeInMs}")
	public void setRefreshTokenTime(int ms) {
	}

	public String generateToken(Authentication authentication) {
		UserDetailsImplement userDetailsImplement = (UserDetailsImplement) authentication.getPrincipal();

		long expiredTime = new Date().getTime() + jwtExpirationMs;

		return Jwts.builder().setSubject(userDetailsImplement.getUsername()).setIssuedAt(new Date(expiredTime))
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}

	public String generateRefreshToken(Authentication auth) {
		String username = (String) auth.getPrincipal();
		Date expiredRefreshTokenTime = new Date(System.currentTimeMillis());

		String refreshToken = Jwts.builder().setSubject(username).setIssuedAt(expiredRefreshTokenTime)
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
		return refreshToken;

	}

	public String getUserNameFromJwtToken(String token) {
		String username = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
		return username;
	}

	public Boolean validate(String jwtToken) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwtToken);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		}

		return false;
	}

}

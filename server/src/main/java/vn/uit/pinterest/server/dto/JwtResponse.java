package vn.uit.pinterest.server.dto;

import java.io.Serializable;
import java.util.List;

public class JwtResponse implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = 6666385038134885735L;

	private String token;

	private String refreshToken;

	private String userId;

	private String username;

	private List<String> roles;

	private int tokenValidTime;

	public JwtResponse() {
	}

	public JwtResponse(String token, String refreshToken, String userId, String username,
			List<String> roles, int tokenValidTime) {
		super();
		this.token = token;
		this.refreshToken = refreshToken;
		this.userId = userId;
		this.username = username;
		this.roles = roles;
		this.tokenValidTime = tokenValidTime;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public int getTokenValidTime() {
		return tokenValidTime;
	}

	public void setTokenValidTime(int tokenValidTime) {
		this.tokenValidTime = tokenValidTime;
	}

}

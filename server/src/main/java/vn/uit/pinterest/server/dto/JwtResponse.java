package vn.uit.pinterest.server.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

public class JwtResponse implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = 6666385038134885735L;
	private String token;
	private String type = "Jwt";
	private String username;
	private String userId;

	private List<String> roles;

	private int tokenValidTime;

	public JwtResponse() {
	}

	public JwtResponse(String token, String type, String username, String userId, List<String> roles,
			int tokenValidTime) {
		this.token = token;
		this.type = type;
		this.username = username;
		this.userId = userId;
		this.roles = roles;
		this.tokenValidTime = tokenValidTime;
	}

	public int getTokenValidTime() {
		return this.tokenValidTime;
	}
	
	
	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public List<String> getRoles() {
		return this.roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public JwtResponse token(String token) {
		setToken(token);
		return this;
	}

	public JwtResponse type(String type) {
		setType(type);
		return this;
	}

	public JwtResponse username(String username) {
		setUsername(username);
		return this;
	}

	public JwtResponse userId(String userId) {
		setUserId(userId);
		return this;
	}

	public JwtResponse roles(List<String> roles) {
		setRoles(roles);
		return this;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof JwtResponse)) {
			return false;
		}
		JwtResponse jwtResponse = (JwtResponse) o;
		return Objects.equals(token, jwtResponse.token) && Objects.equals(type, jwtResponse.type)
				&& Objects.equals(username, jwtResponse.username) && Objects.equals(userId, jwtResponse.userId)
				&& Objects.equals(roles, jwtResponse.roles);
	}

	@Override
	public int hashCode() {
		return Objects.hash(token, type, username, userId, roles);
	}

	@Override
	public String toString() {
		return "{" + " token='" + getToken() + "'" + ", type='" + getType() + "'" + ", username='" + getUsername() + "'"
				+ ", userId='" + getUserId() + "'" + ", roles='" + getRoles() + "'" + "}";
	}

}

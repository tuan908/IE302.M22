package vn.uit.pinterest.server.dto;

import java.io.Serializable;
import java.util.List;

public class JwtResponse implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = 6666385038134885735L;
	private String token;
	private String type = "Bearer";
	private String username;

	private List<String> roles;

	public JwtResponse() {
	}

	public JwtResponse(String token, String type, String username, List<String> roles) {
		this.token = token;
		this.type = type;
		this.username = username;

		this.roles = roles;
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

	public JwtResponse roles(List<String> roles) {
		setRoles(roles);
		return this;
	}

}

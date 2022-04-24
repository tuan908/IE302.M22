package vn.uit.pinterest.server.dto;

import java.io.Serializable;
import java.util.Set;

public class SignupRequest implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = -8127984548299736843L;
	private String username;
	private String password;
	private Set<String> roles;

	public SignupRequest() {
	}

	public SignupRequest(String username, String password, Set<String> roles) {
		this.username = username;
		this.password = password;
		this.roles = roles;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<String> getRoles() {
		return this.roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}

}

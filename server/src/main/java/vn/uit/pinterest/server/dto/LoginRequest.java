package vn.uit.pinterest.server.dto;

import java.io.Serializable;

public class LoginRequest implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 5551899623769447104L;
	private String email;
	private String password;

	public LoginRequest() {
	}

	public LoginRequest(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}

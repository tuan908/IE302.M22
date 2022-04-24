package vn.uit.pinterest.server.entity;

import java.io.Serializable;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "UserCollection")
public class User implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	@Id
	public String userId;

	@Field(name = "postId", targetType = FieldType.STRING)
	public String postId;

	@Field(name = "avatarUrl", targetType = FieldType.STRING)
	public String avatarUrl;

	@Field(name = "userName", targetType = FieldType.STRING)
	public String userName;

	@Field(name = "encryptedPassword", targetType = FieldType.STRING)
	public String encryptedPassword;

	@Field(name = "role", targetType = FieldType.STRING)
	public Set<Role> roles;

	public User() {
	}

	public User(String userId, String postId, String ownerName, String avatarUrl, String postContent, String userName,
			String encryptedPassword, Set<Role> roles) {
		this.userId = userId;
		this.postId = postId;
		this.avatarUrl = avatarUrl;
		this.userName = userName;
		this.encryptedPassword = encryptedPassword;
		this.roles = roles;
	}

	public User(String username, String encryptedPassword) {
		this.userName = username;
		this.encryptedPassword = encryptedPassword;
	}

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPostId() {
		return this.postId;
	}

	public void setPostId(String postId) {
		this.postId = postId;
	}

	public String getAvatarUrl() {
		return this.avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEncryptedPassword() {
		return this.encryptedPassword;
	}

	public void setEncryptedPassword(String encryptedPassword) {
		this.encryptedPassword = encryptedPassword;
	}

	public Set<Role> getRoles() {
		return this.roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

}

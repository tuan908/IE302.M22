package vn.uit.pinterest.server.entity;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "UserCollection")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	public ObjectId userId;

	@Field(name = "postId", targetType = FieldType.STRING)
	public ObjectId postId;

	@Field(name = "avatarUrl", targetType = FieldType.STRING)
	public String avatarUrl;

	@Field(name = "email", targetType = FieldType.STRING)
	public String email;

	@Field(name = "userName", targetType = FieldType.STRING)
	public String userName;

	@Field(name = "encryptedPassword", targetType = FieldType.STRING)
	public String encryptedPassword;

	@Field(name = "role", targetType = FieldType.STRING)
	public Set<Role> roles;

	public User(String username, String encryptedPassword) {
		this.userName = username;
		this.encryptedPassword = encryptedPassword;
	}

	public User() {
	}

	public User(ObjectId userId, ObjectId postId, String avatarUrl, String email, String userName,
			String encryptedPassword, Set<Role> roles) {
		this.userId = userId;
		this.postId = postId;
		this.avatarUrl = avatarUrl;
		this.email = email;
		this.userName = userName;
		this.encryptedPassword = encryptedPassword;
		this.roles = roles;
	}

	public ObjectId getUserId() {
		return this.userId;
	}

	public void setUserId(ObjectId userId) {
		this.userId = userId;
	}

	public ObjectId getPostId() {
		return this.postId;
	}

	public void setPostId(ObjectId postId) {
		this.postId = postId;
	}

	public String getAvatarUrl() {
		return this.avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public User userId(ObjectId userId) {
		setUserId(userId);
		return this;
	}

	public User postId(ObjectId postId) {
		setPostId(postId);
		return this;
	}

	public User avatarUrl(String avatarUrl) {
		setAvatarUrl(avatarUrl);
		return this;
	}

	public User email(String email) {
		setEmail(email);
		return this;
	}

	public User userName(String userName) {
		setUserName(userName);
		return this;
	}

	public User encryptedPassword(String encryptedPassword) {
		setEncryptedPassword(encryptedPassword);
		return this;
	}

	public User roles(Set<Role> roles) {
		setRoles(roles);
		return this;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof User)) {
			return false;
		}
		User user = (User) o;
		return Objects.equals(userId, user.userId) && Objects.equals(postId, user.postId)
				&& Objects.equals(avatarUrl, user.avatarUrl) && Objects.equals(email, user.email)
				&& Objects.equals(userName, user.userName) && Objects.equals(encryptedPassword, user.encryptedPassword)
				&& Objects.equals(roles, user.roles);
	}

	@Override
	public int hashCode() {
		return Objects.hash(userId, postId, avatarUrl, email, userName, encryptedPassword, roles);
	}

	@Override
	public String toString() {
		return "{" +
				" userId='" + getUserId() + "'" +
				", postId='" + getPostId() + "'" +
				", avatarUrl='" + getAvatarUrl() + "'" +
				", email='" + getEmail() + "'" +
				", userName='" + getUserName() + "'" +
				", encryptedPassword='" + getEncryptedPassword() + "'" +
				", roles='" + getRoles() + "'" +
				"}";
	}

}

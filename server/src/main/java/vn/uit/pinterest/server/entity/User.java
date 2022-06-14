package vn.uit.pinterest.server.entity;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "user_collection")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private ObjectId userId;

	@Field(name = "avatar_url", targetType = FieldType.STRING)
	private String avatarUrl;

	@Field(name = "post_list")
	private List<Post> posts;

	@Field(name = "email", targetType = FieldType.STRING)
	private String email;

	@Field(name = "username", targetType = FieldType.STRING)
	private String userName;

	@Field(name = "password", targetType = FieldType.STRING)
	private String encryptedPassword;

	@Field(name = "user_role", targetType = FieldType.STRING)
	private Set<Role> roles;

	@Field(name = "created_time", targetType = FieldType.DATE_TIME)
	private Instant createdTime;

	@Field(name = "updated_time", targetType = FieldType.DATE_TIME)
	private Instant updatedTime;

	public User() {
		super();
	}

	public User(ObjectId userId, String avatarUrl, List<Post> posts, String email, String userName,
			String encryptedPassword, Set<Role> roles, Instant createdTime, Instant updatedTime) {
		super();
		this.userId = userId;
		this.avatarUrl = avatarUrl;
		this.posts = posts;
		this.email = email;
		this.userName = userName;
		this.encryptedPassword = encryptedPassword;
		this.roles = roles;
		this.createdTime = createdTime;
		this.updatedTime = updatedTime;
	}

	public User(String email, String username, String password) {
		this.userName = username;
		this.encryptedPassword = password;
		this.email = email;
	}

	public ObjectId getUserId() {
		return userId;
	}

	public void setUserId(ObjectId userId) {
		this.userId = userId;
	}

	public String getAvatarUrl() {
		return avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public List<Post> getPosts() {
		return posts;
	}

	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEncryptedPassword() {
		return encryptedPassword;
	}

	public void setEncryptedPassword(String encryptedPassword) {
		this.encryptedPassword = encryptedPassword;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Instant getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Instant createdTime) {
		this.createdTime = createdTime;
	}

	public Instant getUpdatedTime() {
		return updatedTime;
	}

	public void setUpdatedTime(Instant updatedTime) {
		this.updatedTime = updatedTime;
	}

}

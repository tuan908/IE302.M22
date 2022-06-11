package vn.uit.pinterest.server.entity;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "post_collection")
public class Post {
	@Id
	public String postId;

	@Field(name = "username")
	private String username;

	@Field(name = "post_status", targetType = FieldType.STRING)
	public String postStatus;

	@Field(name = "post_url", targetType = FieldType.STRING)
	public String postUrl;

	@Field(name = "post_react_count", targetType = FieldType.STRING)
	public Long postReactCount;

	@Field(name = "image", targetType = FieldType.STRING)
	public String base64ImageString;

	@Field(name = "created_time", targetType = FieldType.DATE_TIME)
	public Instant createdTime;

	@Field(name = "updated_time", targetType = FieldType.DATE_TIME)
	private Instant updatedTime;

	@Field(name = "post_title", targetType = FieldType.STRING)
	private String postTitle;

	@Field(name = "post_content", targetType = FieldType.STRING)
	private String content;

	public Post() {
		super();
	}

	public Post(String postId, String user, String postStatus, String postUrl, Long postReactCount, String image,
			Instant createdTime, Instant updatedTime, String postTitle, String content) {
		super();
		this.postId = postId;
		this.username = user;
		this.postStatus = postStatus;
		this.postUrl = postUrl;
		this.postReactCount = postReactCount;
		this.base64ImageString = image;
		this.createdTime = createdTime;
		this.updatedTime = updatedTime;
		this.postTitle = postTitle;
		this.content = content;
	}

	public String getPostId() {
		return postId;
	}

	public void setPostId(String postId) {
		this.postId = postId;
	}

	public String getUser() {
		return username;
	}

	public void setUser(String user) {
		this.username = user;
	}

	public String getPostStatus() {
		return postStatus;
	}

	public void setPostStatus(String postStatus) {
		this.postStatus = postStatus;
	}

	public String getPostUrl() {
		return postUrl;
	}

	public void setPostUrl(String postUrl) {
		this.postUrl = postUrl;
	}

	public Long getPostReactCount() {
		return postReactCount;
	}

	public void setPostReactCount(Long postReactCount) {
		this.postReactCount = postReactCount;
	}

	public String getImage() {
		return base64ImageString;
	}

	public void setImage(String image) {
		this.base64ImageString = image;
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

	public String getPostTitle() {
		return postTitle;
	}

	public void setPostTitle(String postTitle) {
		this.postTitle = postTitle;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

}

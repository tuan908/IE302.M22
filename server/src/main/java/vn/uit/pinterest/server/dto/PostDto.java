package vn.uit.pinterest.server.dto;

import java.time.Instant;

public class PostDto {
	
	public String postId;

	public String username;

	public String postStatus;

	public String postUrl;

	public Long postReactCount;

	public String base64ImageString;

	private String title;

	private String content;

	public Instant createdTime;

	public Instant updatedTime;

	public PostDto() {
		super();
	}

	public PostDto(String postId, String user, String postStatus, String postUrl, Long postReactCount,
			String base64ImageString, String title, String content, Instant createdTime, Instant updatedTime) {
		super();
		this.postId = postId;
		this.username = user;
		this.postStatus = postStatus;
		this.postUrl = postUrl;
		this.postReactCount = postReactCount;
		this.base64ImageString = base64ImageString;
		this.title = title;
		this.content = content;
		this.createdTime = createdTime;
		this.updatedTime = updatedTime;
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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

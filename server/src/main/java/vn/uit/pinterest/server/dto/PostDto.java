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

	private String category;

	private String imgUrlFromSave;

	private String author;

	public PostDto() {
		super();
	}

	public PostDto(String postId, String username, String postStatus, String postUrl, Long postReactCount,
			String base64ImageString, String title, String content, Instant createdTime, Instant updatedTime,
			String category, String imgUrlFromSave, String author) {
		super();
		this.postId = postId;
		this.username = username;
		this.postStatus = postStatus;
		this.postUrl = postUrl;
		this.postReactCount = postReactCount;
		this.base64ImageString = base64ImageString;
		this.title = title;
		this.content = content;
		this.createdTime = createdTime;
		this.updatedTime = updatedTime;
		this.category = category;
		this.imgUrlFromSave = imgUrlFromSave;
		this.author = author;
	}

	public String getPostId() {
		return postId;
	}

	public void setPostId(String postId) {
		this.postId = postId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public String getBase64ImageString() {
		return base64ImageString;
	}

	public void setBase64ImageString(String base64ImageString) {
		this.base64ImageString = base64ImageString;
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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getImgUrlFromSave() {
		return imgUrlFromSave;
	}

	public void setImgUrlFromSave(String imgUrlFromSave) {
		this.imgUrlFromSave = imgUrlFromSave;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

}

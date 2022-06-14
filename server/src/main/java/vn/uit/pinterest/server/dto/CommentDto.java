package vn.uit.pinterest.server.dto;

import java.time.Instant;

public class CommentDto {

	private String commentId;

	private String imgId;

	private String content;

	private Instant commentTime;

	private String username;

	private String avatarUrl;

	private String imageUrl;

	public CommentDto(String commentId, String imgId, String content, Instant commentTime, String username,
			String avatarUrl, String imageUrl) {
		super();
		this.commentId = commentId;
		this.imgId = imgId;
		this.content = content;
		this.commentTime = commentTime;
		this.username = username;
		this.avatarUrl = avatarUrl;
		this.imageUrl = imageUrl;
	}

	public CommentDto() {
		super();
	}

	public String getCommentId() {
		return commentId;
	}

	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}

	public String getImgId() {
		return imgId;
	}

	public void setImgId(String imgId) {
		this.imgId = imgId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Instant getCommentTime() {
		return commentTime;
	}

	public void setCommentTime(Instant commentTime) {
		this.commentTime = commentTime;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAvatarUrl() {
		return avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

}
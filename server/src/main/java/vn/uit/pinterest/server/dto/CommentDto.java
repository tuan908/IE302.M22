package vn.uit.pinterest.server.dto;

import java.time.Instant;
import java.util.Objects;

public class CommentDto {

	private String commentId;

	public String imgId;

	private String content;

	private Instant commentTime;

	private String username;

	private String avatarUrl;

	public CommentDto() {
	}

	public CommentDto(String commentId, String imgId, String content, Instant commentTime, String username,
			String avatarUrl) {
		this.commentId = commentId;
		this.imgId = imgId;
		this.content = content;
		this.commentTime = commentTime;
		this.username = username;
		this.avatarUrl = avatarUrl;
	}

	public String getCommentId() {
		return this.commentId;
	}

	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}

	public String getImgId() {
		return this.imgId;
	}

	public void setImgId(String imgId) {
		this.imgId = imgId;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Instant getCommentTime() {
		return this.commentTime;
	}

	public void setCommentTime(Instant commentTime) {
		this.commentTime = commentTime;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAvatarUrl() {
		return this.avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public CommentDto commentId(String commentId) {
		setCommentId(commentId);
		return this;
	}

	public CommentDto imgId(String imgId) {
		setImgId(imgId);
		return this;
	}

	public CommentDto content(String content) {
		setContent(content);
		return this;
	}

	public CommentDto commentTime(Instant commentTime) {
		setCommentTime(commentTime);
		return this;
	}

	public CommentDto username(String username) {
		setUsername(username);
		return this;
	}

	public CommentDto avatarUrl(String avatarUrl) {
		setAvatarUrl(avatarUrl);
		return this;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof CommentDto)) {
			return false;
		}
		CommentDto commentDto = (CommentDto) o;
		return Objects.equals(commentId, commentDto.commentId) && Objects.equals(imgId, commentDto.imgId)
				&& Objects.equals(content, commentDto.content) && Objects.equals(commentTime, commentDto.commentTime)
				&& Objects.equals(username, commentDto.username) && Objects.equals(avatarUrl, commentDto.avatarUrl);
	}

	@Override
	public int hashCode() {
		return Objects.hash(commentId, imgId, content, commentTime, username, avatarUrl);
	}

	@Override
	public String toString() {
		return "{" +
				" commentId='" + getCommentId() + "'" +
				", imgId='" + getImgId() + "'" +
				", content='" + getContent() + "'" +
				", commentTime='" + getCommentTime() + "'" +
				", username='" + getUsername() + "'" +
				", avatarUrl='" + getAvatarUrl() + "'" +
				"}";
	}

}
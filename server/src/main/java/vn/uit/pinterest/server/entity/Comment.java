package vn.uit.pinterest.server.entity;

import java.io.Serializable;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "CommentCollection")
public class Comment implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5876562025231498205L;

	@Id
	@Indexed(unique = true)
	public String commentId;

	@Field(name = "imgId", targetType = FieldType.STRING)
	public String imgId;

	@Field(name = "userId", targetType = FieldType.STRING)
	public String userId;

	@Field(name = "username", targetType = FieldType.STRING)
	public String username;

	@Field(name = "avatarUrl", targetType = FieldType.STRING)
	public String avatarUrl;

	@Field(name = "content", targetType = FieldType.STRING)
	public String content;

	public Comment() {
	}

	public Comment(String commentId, String imgId, String userId, String username, String avatarUrl, String content) {
		this.commentId = commentId;
		this.imgId = imgId;
		this.userId = userId;
		this.username = username;
		this.avatarUrl = avatarUrl;
		this.content = content;
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

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
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

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Comment commentId(String commentId) {
		setCommentId(commentId);
		return this;
	}

	public Comment imgId(String imgId) {
		setImgId(imgId);
		return this;
	}

	public Comment userId(String userId) {
		setUserId(userId);
		return this;
	}

	public Comment username(String username) {
		setUsername(username);
		return this;
	}

	public Comment avatarUrl(String avatarUrl) {
		setAvatarUrl(avatarUrl);
		return this;
	}

	public Comment content(String content) {
		setContent(content);
		return this;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof Comment)) {
			return false;
		}
		Comment comment = (Comment) o;
		return Objects.equals(commentId, comment.commentId) && Objects.equals(imgId, comment.imgId)
				&& Objects.equals(userId, comment.userId) && Objects.equals(username, comment.username)
				&& Objects.equals(avatarUrl, comment.avatarUrl) && Objects.equals(content, comment.content);
	}

	@Override
	public int hashCode() {
		return Objects.hash(commentId, imgId, userId, username, avatarUrl, content);
	}

	@Override
	public String toString() {
		return "{" +
				" commentId='" + getCommentId() + "'" +
				", imgId='" + getImgId() + "'" +
				", userId='" + getUserId() + "'" +
				", username='" + getUsername() + "'" +
				", avatarUrl='" + getAvatarUrl() + "'" +
				", content='" + getContent() + "'" +
				"}";
	}

}

package vn.uit.pinterest.server.entity;

import java.io.Serializable;
import java.time.Instant;

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

	@Field(name = "time", targetType = FieldType.TIMESTAMP)
	public Instant time;

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

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
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

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Instant getTime() {
		return time;
	}

	public void setTime(Instant time) {
		this.time = time;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Comment(String commentId, String imgId, String userId, String username, String avatarUrl, String content,
			Instant time) {
		super();
		this.commentId = commentId;
		this.imgId = imgId;
		this.userId = userId;
		this.username = username;
		this.avatarUrl = avatarUrl;
		this.content = content;
		this.time = time;
	}

	public Comment() {
	}

}

package vn.uit.pinterest.server.entity;

import java.io.Serializable;
import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "comment_collection")
public class Comment implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 5876562025231498205L;

	@Id
	@Indexed(unique = true)
	private String commentId;

	@Field(name = "img_id", targetType = FieldType.STRING)
	private String imgId;

	@Field(name = "user_id", targetType = FieldType.STRING)
	private String userId;

	@Field(name = "username", targetType = FieldType.STRING)
	private String username;

	@Field(name = "avatar_url", targetType = FieldType.STRING)
	private String avatarUrl;

	@Field(name = "content", targetType = FieldType.STRING)
	private String content;

	@Field(name = "created_time", targetType = FieldType.DATE_TIME)
	private Instant createdTime;

	@Field(name = "updated_time", targetType = FieldType.DATE_TIME)
	private Instant updatedTime;

	@Field(name = "image_url", targetType = FieldType.STRING)
	private String imageUrl;

	public Comment() {
		super();
	}

	public Comment(String commentId, String imgId, String userId, String username, String avatarUrl, String content,
			Instant createdTime, Instant updatedTime, String imageUrl) {
		super();
		this.commentId = commentId;
		this.imgId = imgId;
		this.userId = userId;
		this.username = username;
		this.avatarUrl = avatarUrl;
		this.content = content;
		this.createdTime = createdTime;
		this.updatedTime = updatedTime;
		this.imageUrl = imageUrl;
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

	public Instant getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Instant createdTime) {
		this.createdTime = createdTime;
	}

	public Instant getUpdatedTime() {
		return updatedTime;
	}

	public void setUpdatedTime(Instant instant) {
		this.updatedTime = instant;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getCommentId() {
		return commentId;
	}

}

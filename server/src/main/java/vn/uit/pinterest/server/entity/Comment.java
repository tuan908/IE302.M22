package vn.uit.pinterest.server.entity;

import java.io.Serializable;

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
	@Field(name = "postId", targetType = FieldType.STRING)
	public String postId;

	@Field(name = "userId", targetType = FieldType.STRING)
	public String userId;

	@Field(name = "username", targetType = FieldType.STRING)
	public String username;

	@Field(name = "avatarUrl", targetType = FieldType.STRING)
	public String avatarUrl;

	@Field(name = "commentContent", targetType = FieldType.STRING)
	public String commentContent;

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPostId() {
		return this.postId;
	}

	public void setPostId(String postId) {
		this.postId = postId;
	}

	public String getPostAuthorName() {
		return this.username;
	}

	public void setPostAuthorName(String postAuthorName) {
		this.username = postAuthorName;
	}

	public String getAvatarUrl() {
		return this.avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public String getCommentContent() {
		return this.commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

}

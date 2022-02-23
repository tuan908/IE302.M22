package vn.uit.pinterest.server.schema;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "CommentCollection")
public class Comment {
	@Id
	public Long commentId;

	@Field(name = "userId", targetType = FieldType.STRING)
	public String userId;

	@Indexed(unique = true)
	@Field(name = "postId", targetType = FieldType.STRING)
	public String postId;

	@Field(name = "postAuthorName", targetType = FieldType.STRING)
	public String postAuthorName;

	@Field(name = "avatarUrl", targetType = FieldType.STRING)
	public String avatarUrl;

	@Field(name = "commentContent", targetType = FieldType.STRING)
	public String commentContent;

	public Long getCommentId() {
		return this.commentId;
	}

	public void setCommentId(Long commentId) {
		this.commentId = commentId;
	}

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
		return this.postAuthorName;
	}

	public void setPostAuthorName(String postAuthorName) {
		this.postAuthorName = postAuthorName;
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

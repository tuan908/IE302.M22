package vn.uit.pinterest.server.schema;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "UserCollection")
public class User {
	@MongoId
	public String userId;

	@Field(name = "postId", targetType = FieldType.STRING)
	public String postId;

	@Field(name = "ownerName", targetType = FieldType.STRING)
	public String ownerName;

	@Field(name = "avatarUrl", targetType = FieldType.STRING)
	public String avatarUrl;

	@Field(name = "postContent", targetType = FieldType.STRING)
	public String postContent;

	public String getPostId() {
		return this.postId;
	}

	public void setPostId(String postId) {
		this.postId = postId;
	}

	public String getOwnerName() {
		return this.ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getAvatarUrl() {
		return this.avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public String getPostContent() {
		return this.postContent;
	}

	public void setPostContent(String postContent) {
		this.postContent = postContent;
	}

}

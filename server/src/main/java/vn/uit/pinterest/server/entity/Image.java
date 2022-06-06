package vn.uit.pinterest.server.entity;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "image_collection")
public class Image implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = 1915156976183491190L;

	@Id
	@Field(name = "image_id")
	public String imageId;

	@Field(name = "comment_list")
	public List<Comment> comments;

	@Field(name = "created_time", targetType = FieldType.DATE_TIME)
	public Instant createdTime;

	@Field(name = "updated_time", targetType = FieldType.DATE_TIME)
	private Instant updatedTime;

	public Image() {
		super();
	}

	public Image(String imageId, List<Comment> comments, Instant createdTime, Instant updatedTime) {
		super();
		this.imageId = imageId;
		this.comments = comments;
		this.createdTime = createdTime;
		this.updatedTime = updatedTime;
	}

	public Image(String imgId) {
		this.imageId = imgId;
	}

	public String getImageId() {
		return imageId;
	}

	public void setImageId(String imageId) {
		this.imageId = imageId;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
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

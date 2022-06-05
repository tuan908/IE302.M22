package vn.uit.pinterest.server.entity;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "ImageCollection")
public class Image implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = 1915156976183491190L;

	@Id
	public String imageId;

	@Field(name = "comments")
	public List<Comment> comments;

	@Field(name = "created_time", targetType = FieldType.DATE_TIME)
	public Instant createdTime;

	public Image() {
	}

	public Image(String imageId, List<Comment> comments) {
		this.imageId = imageId;
		this.comments = comments;
	}

	public Image(String imgId) {
	}

	public String getImageId() {
		return this.imageId;
	}

	public void setImageId(String imageId) {
		this.imageId = imageId;
	}

	public List<Comment> getComments() {
		return this.comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public Image imageId(String imageId) {
		setImageId(imageId);
		return this;
	}

	public Image comments(List<Comment> comments) {
		setComments(comments);
		return this;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof Image)) {
			return false;
		}
		Image image = (Image) o;
		return Objects.equals(imageId, image.imageId) && Objects.equals(comments, image.comments);
	}

	@Override
	public int hashCode() {
		return Objects.hash(imageId, comments);
	}

	@Override
	public String toString() {
		return "{" +
				" imageId='" + getImageId() + "'" +
				", comments='" + getComments() + "'" +
				"}";
	}

}

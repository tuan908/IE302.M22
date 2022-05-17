package vn.uit.pinterest.server.entity;

import java.io.Serializable;

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
	public Integer imageId;

	@Field(name = "ownerName", targetType = FieldType.STRING)
	public String ownerName;

	@Field(name = "imageLink", targetType = FieldType.STRING)
	public String imageLink;

	@Field(name = "imageOriginalName", targetType = FieldType.STRING)
	public String imageOriginalName;

	@Field(name = "nameOfAuthor", targetType = FieldType.STRING)
	public String nameOfAuthor;

	@Field(name = "views", targetType = FieldType.INT32)
	public Long views;

	@Field(name = "downloads", targetType = FieldType.INT32)
	public Long downloads;

	public Image() {
	}

	public Image(Integer imageId, String ownerName, String imageLink, String imageOriginalName, String nameOfAuthor,
			Long views, Long downloads) {
		this.imageId = imageId;
		this.ownerName = ownerName;
		this.imageLink = imageLink;
		this.imageOriginalName = imageOriginalName;
		this.nameOfAuthor = nameOfAuthor;
		this.views = views;
		this.downloads = downloads;
	}

	public Integer getImageId() {
		return this.imageId;
	}

	public void setImageId(Integer imageId) {
		this.imageId = imageId;
	}

	public String getOwnerName() {
		return this.ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getImageLink() {
		return this.imageLink;
	}

	public void setImageLink(String imageLink) {
		this.imageLink = imageLink;
	}

	public String getImageOriginalName() {
		return this.imageOriginalName;
	}

	public void setImageOriginalName(String imageOriginalName) {
		this.imageOriginalName = imageOriginalName;
	}

	public String getNameOfAuthor() {
		return this.nameOfAuthor;
	}

	public void setNameOfAuthor(String nameOfAuthor) {
		this.nameOfAuthor = nameOfAuthor;
	}

	public Long getViews() {
		return this.views;
	}

	public void setViews(Long views) {
		this.views = views;
	}

	public Long getDownloads() {
		return this.downloads;
	}

	public void setDownloads(Long downloads) {
		this.downloads = downloads;
	}

}

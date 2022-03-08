package vn.uit.pinterest.server.schema;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "PostCollection")
public class Post {
    @MongoId
    public String postId;

    @Indexed(unique = true)
    @Field(name = "userId", targetType = FieldType.STRING)
    public String userId;

    @Field(name = "postStatus", targetType = FieldType.STRING)
    public String postStatus;

    @Field(name = "postUrl", targetType = FieldType.STRING)
    public String postUrl;

    @Field(name = "postReactCount", targetType = FieldType.STRING)
    public Long postReactCount;

    @Field(name = "imageOriginalName", targetType = FieldType.STRING)
    public String imageOriginalName;

    @Field(name = "nameOfAuthor", targetType = FieldType.STRING)
    public String nameOfAuthor;

    @Field(name = "views", targetType = FieldType.INT32)
    public Long views;

    @Field(name = "downloads", targetType = FieldType.INT32)
    public Long downloads;

    public String getPostId() {
        return this.postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPostStatus() {
        return this.postStatus;
    }

    public void setPostStatus(String postStatus) {
        this.postStatus = postStatus;
    }

    public String getPostUrl() {
        return this.postUrl;
    }

    public void setPostUrl(String postUrl) {
        this.postUrl = postUrl;
    }

    public Long getPostReactCount() {
        return this.postReactCount;
    }

    public void setPostReactCount(Long postReactCount) {
        this.postReactCount = postReactCount;
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

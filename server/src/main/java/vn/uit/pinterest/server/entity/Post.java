package vn.uit.pinterest.server.entity;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "PostCollection")
public class Post {
    @Id
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

    @Field(name = "image", targetType = FieldType.STRING)
    public Image image;

    @Field(name = "created_time", targetType = FieldType.DATE_TIME)
    public Instant createdTime;

    public Post() {
    }

    public Post(String postId, String userId, String postStatus, String postUrl, Long postReactCount, Image image) {
        this.postId = postId;
        this.userId = userId;
        this.postStatus = postStatus;
        this.postUrl = postUrl;
        this.postReactCount = postReactCount;
        this.image = image;
    }

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

    public Image getImage() {
        return this.image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

}

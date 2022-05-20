package vn.uit.pinterest.server.dto;

import java.util.List;
import java.util.Objects;

import vn.uit.pinterest.server.entity.Comment;

public class ImgDto {
    private String imgId;

    private List<Comment> comments;

    public ImgDto() {
    }

    public ImgDto(String imgId, List<Comment> comments) {
        this.imgId = imgId;
        this.comments = comments;
    }

    public String getImgId() {
        return this.imgId;
    }

    public void setImgId(String imgId) {
        this.imgId = imgId;
    }

    public List<Comment> getComments() {
        return this.comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public ImgDto imgId(String imgId) {
        setImgId(imgId);
        return this;
    }

    public ImgDto comments(List<Comment> comments) {
        setComments(comments);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ImgDto)) {
            return false;
        }
        ImgDto imgDto = (ImgDto) o;
        return Objects.equals(imgId, imgDto.imgId) && Objects.equals(comments, imgDto.comments);
    }

    @Override
    public int hashCode() {
        return Objects.hash(imgId, comments);
    }

    @Override
    public String toString() {
        return "{" +
                " imgId='" + getImgId() + "'" +
                ", comments='" + getComments() + "'" +
                "}";
    }

}

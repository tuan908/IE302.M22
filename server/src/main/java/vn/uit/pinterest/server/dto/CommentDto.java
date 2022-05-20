package vn.uit.pinterest.server.dto;

import java.util.Date;

public class CommentDto {
	private String commentId;
	private String content;
	private Date commentTime;

	public CommentDto() {
	}

	public CommentDto(String commentId, String content, Date commentTime) {
		this.commentId = commentId;
		this.content = content;
		this.commentTime = commentTime;
	}

	public String getCommentId() {
		return this.commentId;
	}

	public String getContent() {
		return this.content;
	}

	public Date getCommentTime() {
		return this.commentTime;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public void setCommentTime(Date commentTime) {
		this.commentTime = commentTime;
	}
}

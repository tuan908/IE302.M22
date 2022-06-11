package vn.uit.pinterest.server.dto;

public class UpdateCommentDto {
	private String commentId;
	
	private String contentToUpdate;

	public String getContentToUpdate() {
		return contentToUpdate;
	}

	public void setContentToUpdate(String contentToUpdate) {
		this.contentToUpdate = contentToUpdate;
	}

	public String getCommentId() {
		return commentId;
	}
	
	
}

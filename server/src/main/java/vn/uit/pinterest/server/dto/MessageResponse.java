package vn.uit.pinterest.server.dto;

import java.io.Serializable;

public class MessageResponse implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5646264161553115558L;
	private String message;
	
	public MessageResponse(String message) {
		this.message = message;
	}
	
	public String getMessage() {
		return this.message;}
	
	public void setMessage(String message) {
		this.message = message;
	}

}

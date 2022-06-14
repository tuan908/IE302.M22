package vn.uit.pinterest.server.dto;

import java.util.List;
import vn.uit.pinterest.server.entity.Post;

public class UserDto {

	private String avatarUrl;

	private String email;

	private String username;

	private String userId;

	private List<Post> list;

	public UserDto() {
	}

	public UserDto(String avatarUrl, String email, String username, String userId, List<Post> list) {
		super();
		this.avatarUrl = avatarUrl;
		this.email = email;
		this.username = username;
		this.userId = userId;
		this.list = list;
	}



	public String getAvatarUrl() {
		return avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public List<Post> getList() {
		return list;
	}

	public void setList(List<Post> list) {
		this.list = list;
	}

}

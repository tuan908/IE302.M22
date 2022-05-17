package vn.uit.pinterest.server.dto;

import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
	@Getter
	@Setter
	public String avatarUrl;
	@Getter
	@Setter
	public String email;
	@Getter
	@Setter
	public String username;
	@Getter
	@Setter
	public String userId;

	public UserDto() {
	}

	public UserDto(String avatarUrl, String email, String username, String userId) {
		this.avatarUrl = avatarUrl;
		this.email = email;
		this.username = username;
		this.userId = userId;
	}

	public String getAvatarUrl() {
		return this.avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public UserDto avatarUrl(String avatarUrl) {
		setAvatarUrl(avatarUrl);
		return this;
	}

	public UserDto email(String email) {
		setEmail(email);
		return this;
	}

	public UserDto username(String username) {
		setUsername(username);
		return this;
	}

	public UserDto userId(String userId) {
		setUserId(userId);
		return this;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof UserDto)) {
			return false;
		}
		UserDto userDto = (UserDto) o;
		return Objects.equals(avatarUrl, userDto.avatarUrl) && Objects.equals(email, userDto.email)
				&& Objects.equals(username, userDto.username) && Objects.equals(userId, userDto.userId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(avatarUrl, email, username, userId);
	}

	@Override
	public String toString() {
		return "{" +
				" avatarUrl='" + getAvatarUrl() + "'" +
				", email='" + getEmail() + "'" +
				", username='" + getUsername() + "'" +
				", userId='" + getUserId() + "'" +
				"}";
	}

}

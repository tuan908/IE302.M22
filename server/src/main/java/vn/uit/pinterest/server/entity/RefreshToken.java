package vn.uit.pinterest.server.entity;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;


@Document(collection = "refresh_token_collection")
public class RefreshToken implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 5131456378781009812L;

	private final int TOKEN_EXPIRED_TIME = 60 * 24 * 3600;

	@Id
	private ObjectId tokenId;

	@Field(name = "token", targetType = FieldType.STRING)
	private String token;

	@Field(name = "user")
	private User user;

	private Instant expiredDate;

	@Field(name = "created_time", targetType = FieldType.DATE_TIME)
	private Instant createdTime;

	public RefreshToken() {
	}

	public RefreshToken(ObjectId tokenId, String token, User user, Instant expiredDate) {
		this.tokenId = tokenId;
		this.token = token;
		this.user = user;
		this.expiredDate = expiredDate;
	}

	public RefreshToken(User user, String token) {
		this.token = token;
		this.user = user;
	}

	public ObjectId getTokenId() {
		return this.tokenId;
	}

	public void setTokenId(ObjectId tokenId) {
		this.tokenId = tokenId;
	}

	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Instant getExpiredDate() {
		return this.expiredDate;
	}

	public void setExpiredDate(Instant instant) {
		this.expiredDate = instant;
	}

	public RefreshToken tokenId(ObjectId tokenId) {
		setTokenId(tokenId);
		return this;
	}

	public RefreshToken token(String token) {
		setToken(token);
		return this;
	}

	public RefreshToken user(User user) {
		setUser(user);
		return this;
	}

	public RefreshToken expiredDate(Instant expiredDate) {
		setExpiredDate(expiredDate);
		return this;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof RefreshToken)) {
			return false;
		}
		RefreshToken resetToken = (RefreshToken) o;
		return Objects.equals(tokenId, resetToken.tokenId) && Objects.equals(token, resetToken.token)
				&& Objects.equals(user, resetToken.user) && Objects.equals(expiredDate, resetToken.expiredDate);
	}

	@Override
	public int hashCode() {
		return Objects.hash(tokenId, token, user, expiredDate);
	}

	@Override
	public String toString() {
		return "{" + " tokenId='" + getTokenId() + "'" + ", token='" + getToken() + "'" + ", user='" + getUser() + "'"
				+ ", expiredDate='" + getExpiredDate() + "'" + "}";
	}

	public int getTokenExpiredTime() {
		return this.TOKEN_EXPIRED_TIME;
	}

}

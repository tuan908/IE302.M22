package vn.uit.pinterest.server.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class ResetToken implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5131456378781009812L;

	private final int TOKEN_EXPIRED_TIME = 60 * 24 * 3600;

	@Id
	private ObjectId tokenId;

	private String token;

	private User user;

	private Date expiredDate;

	public ResetToken() {
	}

	public ResetToken(ObjectId tokenId, String token, User user, Date expiredDate) {
		this.tokenId = tokenId;
		this.token = token;
		this.user = user;
		this.expiredDate = expiredDate;
	}

	public ResetToken(User user, String token) {
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

	public Date getExpiredDate() {
		return this.expiredDate;
	}

	public void setExpiredDate(Date expiredDate) {
		this.expiredDate = expiredDate;
	}

	public ResetToken tokenId(ObjectId tokenId) {
		setTokenId(tokenId);
		return this;
	}

	public ResetToken token(String token) {
		setToken(token);
		return this;
	}

	public ResetToken user(User user) {
		setUser(user);
		return this;
	}

	public ResetToken expiredDate(Date expiredDate) {
		setExpiredDate(expiredDate);
		return this;
	}

	@Override
	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (!(o instanceof ResetToken)) {
			return false;
		}
		ResetToken resetToken = (ResetToken) o;
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

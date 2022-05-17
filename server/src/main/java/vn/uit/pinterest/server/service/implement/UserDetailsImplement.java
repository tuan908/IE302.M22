package vn.uit.pinterest.server.service.implement;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.bson.types.ObjectId;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import vn.uit.pinterest.server.entity.User;

public class UserDetailsImplement implements UserDetails {

	private static final long serialVersionUID = 7442197009359142060L;
	private String userId;
	private String username;
	@JsonIgnore
	private String encryptedPassword;

	private Collection<? extends GrantedAuthority> userAuthorities;

	public UserDetailsImplement(ObjectId userId, String username, String encryptedPassword,
			Collection<? extends GrantedAuthority> userAuthorities) {
		this.username = username;
		this.encryptedPassword = encryptedPassword;
		this.userAuthorities = userAuthorities;
	}

	public static UserDetailsImplement build(User user) {

		List<GrantedAuthority> userAuthorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getRoleName())).collect(Collectors.toList());

		ObjectId userId = user.getUserId();
		String username = user.getUserName();
		String password = user.getEncryptedPassword();

		UserDetailsImplement userDetailsImplement = new UserDetailsImplement(userId, username, password,
				userAuthorities);

		return userDetailsImplement;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return userAuthorities;
	}

	@Override
	public String getPassword() {
		return encryptedPassword;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object object) {
		if (this == object) {
			return true;
		}

		if (object == null || getClass() != object.getClass()) {
			return false;
		}

		UserDetailsImplement userDetailsImplement = (UserDetailsImplement) object;
		return Objects.equals(userId, userDetailsImplement.userId);

	}

}

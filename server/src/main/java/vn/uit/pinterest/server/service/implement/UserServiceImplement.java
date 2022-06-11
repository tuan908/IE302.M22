package vn.uit.pinterest.server.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import vn.uit.pinterest.server.entity.RefreshToken;
import vn.uit.pinterest.server.entity.User;
import vn.uit.pinterest.server.repository.RefreshTokenRepository;

@Service
public class UserServiceImplement {

	@Autowired
	RefreshTokenRepository tokenRepo;

	public void createForgotPasswordToken(User user, String token) {
		RefreshToken resetToken = new RefreshToken(user, token);
		tokenRepo.save(resetToken);
	}

	public SimpleMailMessage createResetTokenEmail(String contextPath, String token, User user) {
		String url = contextPath + "/forgot?token=" + token;
		String message = "Reset your password now!!!";
		return createEmail("Reset password", message + " \r\n" + url, user);
	}

	public SimpleMailMessage createEmail(String subject, String body, User user) {
		SimpleMailMessage email = new SimpleMailMessage();
		email.setSubject(subject);
		email.setText(body);
		email.setTo(user.getEmail());
		return email;
	}
}

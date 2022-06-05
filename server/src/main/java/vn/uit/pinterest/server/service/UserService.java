package vn.uit.pinterest.server.service;

import org.springframework.mail.SimpleMailMessage;

import vn.uit.pinterest.server.entity.User;

public interface UserService {
	
	public void createForgotPasswordToken(User user, String token);

	public SimpleMailMessage createResetTokenEmail(String contextPath, String token, User user);

	public SimpleMailMessage createEmail(String subject, String body, User user);

}

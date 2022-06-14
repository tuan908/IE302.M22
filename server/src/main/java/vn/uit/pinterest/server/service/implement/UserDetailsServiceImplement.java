package vn.uit.pinterest.server.service.implement;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.uit.pinterest.server.entity.User;
import vn.uit.pinterest.server.repository.UserRepository;

@Service
public class UserDetailsServiceImplement implements UserDetailsService {

	@Autowired
	UserRepository repository;
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
		Optional<User> result = repository.findByName(name);
		
		if (!result.isPresent()) {
			String message = "Can't find username" + name;
			throw new UsernameNotFoundException(message);
		}
		return UserDetailsImplement.build(result.get());
	}

}

package vn.uit.pinterest.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.uit.pinterest.server.entity.User;

@Service
public class UserDetailsServiceImplement implements UserDetailsService {

	@Autowired
	MongoTemplate mongoTemplate;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		Query query = new Query(Criteria.where("userName").is(userName));
		User user = mongoTemplate.findOne(query, User.class);
				
		if (user == null) {
			String message = "Can't find username" + userName;
			throw new UsernameNotFoundException(message);
		}
		return UserDetailsImplement.build(user);
	}

}

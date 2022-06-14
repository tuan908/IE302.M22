package vn.uit.pinterest.server.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import vn.uit.pinterest.server.entity.User;

@Repository
public interface UserRepository extends MongoRepository<User, Long> {
	
    public Boolean existsByUserName(String username);

    @Query("{'username': ?0}")
    public Optional<User> findByName(String username);
    
    @Query("{'_id': ?0")
    public Optional<User> findById(String userId);
}

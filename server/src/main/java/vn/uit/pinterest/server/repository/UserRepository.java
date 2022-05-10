package vn.uit.pinterest.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import vn.uit.pinterest.server.entity.User;

@Repository
public interface UserRepository extends MongoRepository<User, Long> {
    public Boolean existsByUserName(String username);

    @Query("{'userName': ?0}")
    public User findByUsername(String username);
}

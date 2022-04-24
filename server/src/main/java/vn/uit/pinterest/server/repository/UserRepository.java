package vn.uit.pinterest.server.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import vn.uit.pinterest.server.entity.User;

@Repository
public interface UserRepository extends MongoRepository<User, Long> {
    public Optional<User> findByUserName(String userName);

    public Boolean existsByUserName(String username);
}

package vn.uit.pinterest.server.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import vn.uit.pinterest.server.schema.User;

@Repository
public interface UserRepository extends MongoRepository<User, Long> {

}

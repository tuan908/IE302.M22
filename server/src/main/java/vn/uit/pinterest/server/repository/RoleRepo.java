package vn.uit.pinterest.server.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import vn.uit.pinterest.server.entity.Role;

@Repository
public interface RoleRepo extends MongoRepository<Role, String> {
    @Query("{'roleName': ?0}")
    Optional<Role> findByRoleName(String roleName);

}

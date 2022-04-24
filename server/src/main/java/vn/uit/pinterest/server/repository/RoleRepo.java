package vn.uit.pinterest.server.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import vn.uit.pinterest.server.common.ERole;
import vn.uit.pinterest.server.entity.Role;

public interface RoleRepo extends MongoRepository<Role, String> {

    Optional<Role> findByRoleName(ERole roleUser);

}

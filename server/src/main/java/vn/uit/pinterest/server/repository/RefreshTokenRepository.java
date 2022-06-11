package vn.uit.pinterest.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import vn.uit.pinterest.server.entity.ResetToken;

@Repository
public interface ResetTokenRepository extends MongoRepository<ResetToken, String> {

}

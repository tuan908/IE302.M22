package vn.uit.pinterest.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import vn.uit.pinterest.server.entity.ResetToken;

public interface ResetTokenRepo extends MongoRepository<ResetToken, String> {

}

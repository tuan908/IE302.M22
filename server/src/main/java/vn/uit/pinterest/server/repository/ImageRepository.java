package vn.uit.pinterest.server.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import vn.uit.pinterest.server.entity.Image;

@Repository
public interface ImageRepository extends MongoRepository<Image, String> {
    @Query("{'_id': ?0}")
    Optional<Image> findByImageId(String imageId);
}
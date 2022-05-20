package vn.uit.pinterest.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import vn.uit.pinterest.server.entity.Image;

/**
 * ImgRepo
 */
public interface ImgRepo extends MongoRepository<Image, String> {

}
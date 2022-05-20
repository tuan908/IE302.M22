package vn.uit.pinterest.server.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.uit.pinterest.server.dto.CommentDto;
import vn.uit.pinterest.server.dto.MessageResponse;
import vn.uit.pinterest.server.entity.Comment;
import vn.uit.pinterest.server.entity.Image;
import vn.uit.pinterest.server.repository.CommentRepo;
import vn.uit.pinterest.server.repository.ImgRepo;

@RestController
public class CommentController {

	@Autowired
	CommentRepo repo;

	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
	ImgRepo imgRepo;

	@Transactional(rollbackFor = Exception.class)
	@GetMapping("/api/image/{imgId}/comments/get")
	public ResponseEntity<?> getCommentsByImgId(@PathVariable String imgId) {

		Integer integerImgId = Integer.valueOf(imgId);
		Query query = new Query(Criteria.where("_id").is(integerImgId));
		Image img = mongoTemplate.findOne(query, Image.class);
		if (img != null) {
			List<Comment> comments = img.getComments();
			if (comments.isEmpty()) {
				new ResponseEntity<Comment>(HttpStatus.NOT_FOUND);
				return ResponseEntity.status(404).body("Not found any comment");
			} else {
				new ResponseEntity<Comment>(HttpStatus.OK);
				return ResponseEntity.status(200).body(comments);
			}
		}
		new ResponseEntity<Comment>(HttpStatus.OK);
		return ResponseEntity.status(200).body("Request sucessfully");
	}

	@Transactional(rollbackFor = Exception.class)
	@RequestMapping("/api/comment/get/{id}")
	public ResponseEntity<?> getCommentById(@PathVariable String id) {
		Comment comment = mongoTemplate.findById(id, Comment.class);
		if (comment != null) {
			new ResponseEntity<Comment>(HttpStatus.OK);
			return ResponseEntity.status(200).body(comment);

		} else {
			new ResponseEntity<Comment>(HttpStatus.NOT_FOUND);
			return ResponseEntity.status(404).body("Not found any comment");
		}
	}

	@Transactional(rollbackFor = Exception.class)
	@PostMapping(value = "/api/comment/create")
	public ResponseEntity<?> postNewComment(@RequestBody CommentDto comment) {
		if (StringUtils.hasLength(comment.getContent())) {
			Comment requestedCmt = new Comment();
			requestedCmt.setAvatarUrl(comment.getAvatarUrl());
			requestedCmt.setContent(comment.getContent());
			requestedCmt.setImgId(comment.getImgId());
			repo.save(requestedCmt);
			Integer imgId = Integer.valueOf(comment.getImgId());
			Integer integerImgId = Integer.valueOf(imgId);
			Query query = new Query(Criteria.where("_id").is(integerImgId));
			Image img = mongoTemplate.findOne(query, Image.class);

			if (img != null) {
				
				List<Comment> comments = img.getComments();
				comments.add(requestedCmt);
				img.setComments(comments);
				imgRepo.save(img);
			} else {
				Image image = new Image();
				image.setImageId(integerImgId);
				List<Comment> comments = image.getComments();
				comments = new ArrayList<>();
				comments.add(requestedCmt);
				image.setComments(comments);
				imgRepo.save(image);
			}
			new ResponseEntity<CommentDto>(HttpStatus.OK);
			return ResponseEntity.status(200).body(comment);
		} else {
			new ResponseEntity<Comment>(HttpStatus.BAD_REQUEST);
			return ResponseEntity.status(400).body("Bad request");
		}
	}

	@Transactional(rollbackFor = Exception.class)
	@PutMapping(value = "/api/comment/update/{commentId}")
	public ResponseEntity<?> updateExistedComment(@PathVariable String commentId, @RequestBody Comment comment) {
		if (commentId != null) {
			Query updateQuery = new Query(Criteria.where("commentId").is(commentId));
			Update update = new Update();
			update.set("avatarUrl", comment.avatarUrl);
			update.set("commentContent", comment.content);

			mongoTemplate.updateFirst(updateQuery, update, Comment.class);
			new ResponseEntity<>(HttpStatus.OK);
			return ResponseEntity.status(200).body(comment);
		} else {
			new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			return ResponseEntity.status(400).body("Bad request");
		}

	}

	@Transactional(rollbackFor = Exception.class)
	@DeleteMapping(value = "/api/comment/delete/{id}")
	public ResponseEntity<?> deleteCommentById(@PathVariable String id) {
		if (id != null) {
			Query query = new Query(Criteria.where("_id").is(id));
			mongoTemplate.findAndRemove(query, Comment.class);
			new ResponseEntity<Comment>(HttpStatus.OK);
			return ResponseEntity.status(200).body("Comment deleted");
		} else {
			new ResponseEntity<Comment>(HttpStatus.BAD_REQUEST);
			return ResponseEntity.status(400).body("Bad request");
		}

	}

}

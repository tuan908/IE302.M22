package vn.uit.pinterest.server.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
import vn.uit.pinterest.server.repository.CommentRepository;
import vn.uit.pinterest.server.repository.ImageRepository;

@RestController
public class CommentController {

	@Autowired
	CommentRepository commentRepository;

	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
	ImageRepository imageRepository;

	@Transactional(rollbackFor = Exception.class)
	@GetMapping("/api/image/{imgId}/comments/get")
	public ResponseEntity<?> getCommentsByImgId(@PathVariable String imgId) {
		Optional<Image> image = imageRepository.findByImageId(imgId);

		if (!image.isPresent()) {
			Image newImage = new Image(imgId);

			imageRepository.save(newImage);
			new ResponseEntity<MessageResponse>(HttpStatus.OK);
			List<Comment> comments = new ArrayList<>();

			return ResponseEntity.ok().body(comments);
		} else {
			List<Comment> comments = commentRepository.findAllByImageId(imgId);
			new ResponseEntity<MessageResponse>(HttpStatus.OK);

			return ResponseEntity.ok().body(comments);
		}

	}

	@Transactional(rollbackFor = Exception.class)
	@RequestMapping("/api/comment/get/{id}")
	public ResponseEntity<?> getCommentById(@PathVariable String id) {
		Comment comment = commentRepository.findOneById(id);
		CommentDto response = new CommentDto();

		response.setCommentId(comment.getCommentId());
		response.setAvatarUrl(null);
		response.setCommentTime(comment.getCreatedTime());
		response.setContent(comment.getContent());
		response.setImgId(comment.getImgId());

		new ResponseEntity<Comment>(HttpStatus.OK);
		return ResponseEntity.status(200).body(response);
	}

	@Transactional(rollbackFor = Exception.class)
	@PostMapping(value = "/api/comment/create")
	public ResponseEntity<?> postNewComment(@RequestBody CommentDto comment) {
		if (StringUtils.hasLength(comment.getContent())) {
			Comment requestedComment = new Comment();
			requestedComment.setAvatarUrl(comment.getAvatarUrl());
			requestedComment.setContent(comment.getContent());
			requestedComment.setImgId(comment.getImgId());
			requestedComment.setCreatedTime(Instant.now());
			requestedComment.setImageUrl(comment.getImageUrl());
			
			commentRepository.save(requestedComment);
			String id = comment.getImgId();

			Optional<Image> img = imageRepository.findByImageId(id);

			if (img.isPresent()) {
				Image image = img.get();
				List<Comment> comments = new ArrayList<>();
				comments = image.getComments();
				comments.add(requestedComment);
				image.setComments(comments);
				imageRepository.save(image);
			} else {
				Image newImg = new Image();
				newImg.setImageId(id);
				List<Comment> comments = new ArrayList<>();
				comments.add(requestedComment);
				newImg.setComments(comments);
				imageRepository.save(newImg);
			}
			new ResponseEntity<CommentDto>(HttpStatus.OK);
			return ResponseEntity.status(200).body(comment);
		} else {
			new ResponseEntity<Comment>(HttpStatus.BAD_REQUEST);
			return ResponseEntity.status(400).body(new MessageResponse("Bad request"));
		}
	}

	@Transactional(rollbackFor = Exception.class)
	@PutMapping(value = "/api/comment/update/{commentId}")
	public ResponseEntity<?> updateExistedComment(@PathVariable String commentId, @RequestBody Comment comment) {
		if (commentId != null) {
			Query updateQuery = new Query(Criteria.where("comment_id").is(commentId));
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

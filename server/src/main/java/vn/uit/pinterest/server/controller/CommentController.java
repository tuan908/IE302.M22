package vn.uit.pinterest.server.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import vn.uit.pinterest.server.dto.UpdateCommentDto;
import vn.uit.pinterest.server.entity.Comment;
import vn.uit.pinterest.server.entity.Image;
import vn.uit.pinterest.server.repository.CommentRepository;
import vn.uit.pinterest.server.repository.ImageRepository;

@RestController
@RequestMapping("/api/comment/")
public class CommentController {

	@Autowired
	CommentRepository commentRepository;

	@Autowired
	ImageRepository imageRepository;

	@Transactional(rollbackFor = Exception.class)
	@GetMapping("/api/image/{imgId}/comments/get")
	public ResponseEntity<?> getCommentsByImgId(@PathVariable String imgId) {
		Optional<Image> image = imageRepository.findByImageId(imgId);

		if (!image.isPresent()) {
			Image newImage = new Image(imgId);
			List<Comment> comments = new ArrayList<>();
			imageRepository.save(newImage);

			return ResponseEntity.ok().body(comments);
		} else {
			Optional<List<Comment>> comments = commentRepository.findAllByImageId(imgId);

			if (comments.isEmpty()) {

				return ResponseEntity.ok().body(comments.get());
			} else {
				return ResponseEntity.ok().body(comments.get());
			}
		}

	}

	@Transactional(rollbackFor = Exception.class)
	@PostMapping(value = "create")
	public ResponseEntity<?> postNewComment(@RequestBody CommentDto comment) {
		if (StringUtils.hasLength(comment.getContent())) {
			String id = comment.getImgId();
			Optional<Image> img = imageRepository.findByImageId(id);

			Comment requestedComment = new Comment();
			requestedComment.setAvatarUrl(comment.getAvatarUrl());
			requestedComment.setContent(comment.getContent());
			requestedComment.setImgId(comment.getImgId());
			requestedComment.setCreatedTime(Instant.now());
			requestedComment.setImageUrl(comment.getImageUrl());
			requestedComment.setUsername(comment.getUsername());

			if (img.isPresent()) {
				Image image = img.get();
				Optional<List<Comment>> results = commentRepository.findAllByImageId(id);
				if (results.isEmpty()) {
					List<Comment> initList = new ArrayList<>();
					initList.add(requestedComment);
					image.setComments(initList);
					imageRepository.save(image);
					commentRepository.save(requestedComment);
				} else {
					results.get().add(requestedComment);
					image.setComments(results.get());
					imageRepository.save(image);
					commentRepository.save(requestedComment);
				}
			} else {
				Image newImg = new Image();
				newImg.setImageId(id);
				List<Comment> comments = new ArrayList<>();
				comments.add(requestedComment);
				newImg.setComments(comments);
				imageRepository.save(newImg);
			}
			return ResponseEntity.status(200).body(comment);
		} else {
			return ResponseEntity.status(400).body(new MessageResponse("Bad request"));
		}
	}

	@Transactional(rollbackFor = Exception.class)
	@PutMapping(value = "update/{commentId}")
	public ResponseEntity<?> updateExistedComment(@PathVariable String commentId,
			@RequestBody UpdateCommentDto request) {
		Optional<Comment> result = commentRepository.findOneById(commentId);
		if (result.isPresent()) {
			result.get().setContent(request.getContentToUpdate());
			result.get().setUpdatedTime(Instant.now());

			return ResponseEntity.ok().body(result.get());
		} else {
			return ResponseEntity.badRequest().body(new MessageResponse("Bad request."));
		}

	}

	@Transactional(rollbackFor = Exception.class)
	@DeleteMapping(value = "delete/{id}")
	public ResponseEntity<?> deleteCommentById(@PathVariable String id) {
		commentRepository.deleteById(id);
		return ResponseEntity.status(200).body("Comment deleted");
	}

}

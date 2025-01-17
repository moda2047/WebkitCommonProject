package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.boardEntity;
import com.example.demo.entity.commentEntity;
import com.example.demo.repository.boardRepository;
import com.example.demo.repository.commentRepository;

@RestController
@RequestMapping("board/{boardId}/comment")
public class commentController {
	@Autowired
    private commentRepository commentRepository;

	@Autowired
    private boardRepository boardRepository;
    // Create
	@PostMapping
    public commentEntity create(@PathVariable int boardId, @RequestBody commentEntity comment) {
        // 게시글 id를 기반으로 댓글에 게시글 정보를 설정
		 boardEntity board = boardRepository.findById(boardId).orElse(null);
        comment.setBoard(board);
        return commentRepository.save(comment);
    }

    // Read (All)
    @GetMapping
    public List<commentEntity> getAll() {
        return commentRepository.findAll();
    }

    // Read (Single)
    @GetMapping("/{id}")
    public commentEntity get(@PathVariable int id) {
    	commentEntity comment = commentRepository.findById(id).orElse(null);
         if (comment != null) {
             
             // 변경사항 데이터베이스에 반영
        	 commentRepository.save(comment);
         }
         return comment;
    }

    // Update
    @PutMapping("/{id}")
    public commentEntity update(@PathVariable int id, @RequestBody commentEntity comment) {
    	commentEntity existingboard = commentRepository.findById(id).orElse(null);
        if (existingboard != null) {
        	
            return commentRepository.save(existingboard);
        }
        return null;
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
    	commentRepository.deleteById(id);
    }
}
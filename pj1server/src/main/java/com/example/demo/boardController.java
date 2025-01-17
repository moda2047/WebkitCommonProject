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

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/board")
public class boardController {
	@Autowired
    private boardRepository boardRepository;

	 @Autowired
	    private commentRepository commentRepository;
    // Create
    @PostMapping
    public boardEntity create(@RequestBody boardEntity board) {
        return boardRepository.save(board);
    }

    // Read (All)
    @GetMapping
    public List<boardEntity> getAll() {
        List<boardEntity> boards = boardRepository.findAll();
        // 게시글 목록 조회 후, comment 정보를 삭제합니다.
        boards.forEach(board -> board.setComments(null));
        return boards;
    }
 
    // Read (Single)
    @GetMapping("/{id}")
    public boardEntity get(@PathVariable int id) {
    	 boardEntity board = boardRepository.findById(id).orElse(null);
         if (board != null) {
             // 조회수 증가
             board.setHit(board.getHit() + 1);
             // 변경사항 데이터베이스에 반영
             boardRepository.save(board);   
         }
         return board;
    }

    // Update
    @PutMapping("/{id}")
    public boardEntity update(@PathVariable int id, @RequestBody boardEntity board) {
    	boardEntity existingboard = boardRepository.findById(id).orElse(null);
        if (existingboard != null) {
        	existingboard.setName(board.getName());
        	existingboard.setTitle(board.getTitle());
        	existingboard.setContent(board.getContent());
            return boardRepository.save(existingboard);
        }
        return null;
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
    	boardRepository.deleteById(id);
    }
}

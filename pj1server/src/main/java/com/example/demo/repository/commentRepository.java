package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.commentEntity;

public interface commentRepository extends JpaRepository<commentEntity, Integer>{
	
}

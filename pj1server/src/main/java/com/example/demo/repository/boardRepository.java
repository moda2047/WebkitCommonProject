package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.boardEntity;

public interface boardRepository extends JpaRepository<boardEntity, Integer> {

}

package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class commentDTO {
    private int commentId;
    private int boardNo; // boardEntity의 번호(no)와 일치시키기 위한 필드
    private String name;
    private String content;
    private LocalDateTime regdate;
}
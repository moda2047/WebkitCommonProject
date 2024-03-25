package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class boardDTO {
    private int no;
    private String name;
    private String title;
    private String content;
    private LocalDateTime regdate;
    private int hit;
    // CommentDTO는 여기에 포함시키지 않음
}

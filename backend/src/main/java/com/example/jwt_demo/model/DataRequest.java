package com.example.jwt_demo.model;

import jakarta.persistence.*;
import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DataRequest {

    private String fileName;
    private String fileType;
    private Float fileSize;
}

package com.example.jwt_demo.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import com.example.jwt_demo.model.KycDocument;
import com.example.jwt_demo.model.DataRequest;

import java.util.List;
import java.util.HashMap;

import com.example.jwt_demo.model.User;

public interface FileProcessingService {
    List<String> fileList();

    String uploadFile(User merchant, MultipartFile file);

    Resource downloadFile(String fileName);

    List<KycDocument> getAllFiles();

    HashMap<String, String> createPresignedUrl(User merchant, DataRequest request);
}

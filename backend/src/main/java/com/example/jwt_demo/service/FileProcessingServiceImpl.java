package com.example.jwt_demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.jwt_demo.repository.KycDocumentRepository;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.jwt_demo.model.KycDocument;
import com.example.jwt_demo.model.KycStatus;
import com.example.jwt_demo.model.User;
import com.example.jwt_demo.model.DataRequest;

import java.util.UUID;

import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Service
public class FileProcessingServiceImpl implements FileProcessingService {


    private String basePath = "kyc-documents-bucket";

    @Autowired
    private KycDocumentRepository kycDocumentRepository;

    @Override
    public List<String> fileList() {
        File dir = new File(basePath);
        File[] files = dir.listFiles();

        return files != null ? Arrays.stream(files).map(File::getName).collect(Collectors.toList()) : null;
    }

    private S3Presigner s3Presigner;

    @Override
    public String uploadFile(User merchant, MultipartFile multipartFile) {
        File dir = new File(basePath + multipartFile.getOriginalFilename());

        if (dir.exists()) {
            return "EXIST";
        }

        Path path = Path.of(basePath + multipartFile.getName());

        try {
            KycDocument doc = new KycDocument();
            doc.setFileName(multipartFile.getOriginalFilename());
            // ... autres métadonnées
            doc.setMerchant(merchant);
            doc.setStatus(KycStatus.PENDING);
            String objectKey = String.format("%s/%s", UUID.randomUUID(), multipartFile.getName());
            doc.setS3ObjectKey(objectKey);
            doc.setFileSize(multipartFile.getSize());

            String fileName = multipartFile.getName();
            String extension = multipartFile.getContentType();
            int lastDotIndex = fileName.lastIndexOf('.');
            if (lastDotIndex > 0) {
                extension = fileName.substring(lastDotIndex + 1);
            }
            doc.setFileType(extension);

            KycDocument savedDoc = kycDocumentRepository.save(doc);

            PutObjectRequest objectRequest = PutObjectRequest.builder()
                    .bucket(basePath)
                    .key(objectKey)
                    .contentType(multipartFile.getContentType())
                    .build();

            PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                    .signatureDuration(Duration.ofMinutes(15)) // URL valide 15 minutes
                    .putObjectRequest(objectRequest)
                    .build();

            String presignedUrl = s3Presigner.presignPutObject(presignRequest).url().toString();

            Files.copy(multipartFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            multipartFile.transferTo(new File(path + multipartFile.getOriginalFilename()));
            return presignedUrl;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return "FAILED";
    }

    @Override
    public List<KycDocument> getAllFiles() {
        return kycDocumentRepository.findAll();
    }

    @Override
    public Resource downloadFile(String fileName) {
        File dir = new File(basePath + fileName);
        try {
            if (dir.exists()) {
                return new UrlResource(dir.toURI());
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
        return null;
    }

    @Override
    public HashMap<String, String> createPresignedUrl(User merchant, DataRequest request) {
        // 1. Créer une entrée en base de données
        KycDocument doc = new KycDocument();
        doc.setMerchant(merchant);
        doc.setFileName(request.getFileName());
        doc.setStatus(KycStatus.PENDING);
        String objectKey = String.format("%s/%s/%s", merchant.getId(), UUID.randomUUID(), request.getFileName());
        doc.setS3ObjectKey(objectKey);
        KycDocument savedDoc = kycDocumentRepository.save(doc);

        // 2. Générer l'URL pré-signée
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(basePath)
                .key(objectKey)
                .contentType(request.getFileType())
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(15)) // URL valide 15 minutes
                .putObjectRequest(objectRequest)
                .build();

        String presignedUrl = s3Presigner.presignPutObject(presignRequest).url().toString();

        HashMap<String, String> response = new HashMap<>();
        response.put("id", savedDoc.getId().toString());
        response.put("presignedUrl", presignedUrl);
        return response;

    }
}

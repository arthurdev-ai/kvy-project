package com.example.jwt_demo.controller;

import com.example.jwt_demo.service.FileProcessingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.jwt_demo.model.DataRequest;
import java.util.HashMap;

import com.example.jwt_demo.model.User;
import com.example.jwt_demo.model.KycDocument;
import com.example.jwt_demo.model.KycStatus;

import com.example.jwt_demo.repository.KycDocumentRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/file")
public class FileProcessingController {

    @Autowired
    private FileProcessingService fileProcessingService;

    @Autowired
    private KycDocumentRepository kycDocumentRepository;

    @GetMapping("/list")
    public ResponseEntity<?> getFileList() {
        return new ResponseEntity<>(fileProcessingService.fileList(), HttpStatus.OK);
    }

    @GetMapping("/documents")
    public ResponseEntity<?> getDocumentList() {
        HashMap<String, List<KycDocument>> response = new HashMap<>();
        response.put("data", fileProcessingService.getAllFiles());
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/download/{name}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<?> downloadFile(@PathVariable(value = "name") String fileName) {
        Resource file = fileProcessingService.downloadFile(fileName);
        if (file == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM).body(file);
        }
    }

    @PostMapping("/generate-upload-url")
    public ResponseEntity<?> generateUploadUrl(@AuthenticationPrincipal User merchant, @Valid @RequestBody DataRequest  request) {
        // Validation (taille max 5MB, types autorisés)
        if (request.getFileSize() > 5 * 1024 * 1024) {
            return ResponseEntity.badRequest().build();
        }

        HashMap<String, String> response = new HashMap<>();
        response = fileProcessingService.createPresignedUrl(merchant, request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{documentId}/confirm")
    public ResponseEntity<?> confirmUpload(
            @PathVariable UUID documentId,
            @Valid @RequestBody KycDocument request) {
        HashMap<String, String> response = new HashMap<>();
        Optional<KycDocument> doc = kycDocumentRepository.findById(documentId);
        if (doc.isPresent()) {
            KycDocument document = doc.get();
            
            document.setChecksum(request.getChecksum());
            document.setStatus(KycStatus.VERIFIED);
            response.put("status", "success");
        } else {
            response.put("status", "failed");
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@AuthenticationPrincipal User merchant, @RequestBody MultipartFile file) {
        HashMap<String, String> response = new HashMap<>();
        if (file.getSize() > 5 * 1024 * 1024) {
            response.put("echec", "Taille maximale dépassée");
            return ResponseEntity.ok(response);
        }
        String status = fileProcessingService.uploadFile(merchant, file);
        if ("EXIST".equals(status)) {
            response.put("message", "Le fichier existe dans notre base de donnée");
        }
        if ("CREATED".equals(status)) {
            response.put("message", "Le fichier enregistré");
        }
        if ("FAILED".equals(status)) {
            response.put("message", "Impossible d'enregistrer le fichier");
        }
        response.put("status", status);
        return ResponseEntity.ok(response);

    }

}

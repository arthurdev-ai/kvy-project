package com.example.jwt_demo.repository;

import java.util.UUID;

import com.example.jwt_demo.model.KycDocument;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface KycDocumentRepository extends JpaRepository<KycDocument, Long> {

    public Optional<KycDocument> findById(UUID documentId);

}

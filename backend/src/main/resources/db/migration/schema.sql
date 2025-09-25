

-- Table pour les marchands
CREATE TABLE merchants (
    id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
);

-- Table pour les documents KYC
CREATE TABLE kyc_documents (
    id UUID PRIMARY KEY,
    merchant_id UUID NOT NULL REFERENCES merchants(id),
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    s3_object_key VARCHAR(512) NOT NULL UNIQUE,
    checksum VARCHAR(64) NULL, -- SHA-256
    status VARCHAR(50) NOT NULL, -- Ex: PENDING, UPLOADED, VERIFIED, REJECTED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_kyc_documents_merchant_id ON kyc_documents(merchant_id);
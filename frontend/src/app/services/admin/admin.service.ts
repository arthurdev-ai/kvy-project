import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentType } from 'app/pages/admin/list-kyc-doc/list-kyc-doc.component';
import { Observable } from 'rxjs';
interface responseInterface {
  data: DocumentType[];
}
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8081/file';
  constructor(private http: HttpClient) {}

  getDocuments() {
    return this.http.get<responseInterface>(`${this.apiUrl}/documents`);
  }

  // Étape 1: Obtenir l'URL pré-signée du backend
  getPresignedUrl(
    fileName: string,
    fileType: string,
    fileSize: number
  ): Observable<any> {
    // Le token JWT doit être ajouté par un HttpInterceptor
    return this.http.post(this.apiUrl + '/generate-upload-url', {
      fileName,
      fileType,
      fileSize,
    });
  }

  // Étape 2: Uploader le fichier directement sur S3
  uploadFileToS3(presignedUrl: string, file: File): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': file.type });
    return this.http.put(presignedUrl, file, {
      headers: headers,
      reportProgress: true, // Pour suivre la progression
      observe: 'events',
    });
  }

  // Étape 3: Confirmer l'upload auprès du backend
  confirmUpload(documentId: string, checksum: string): Observable<any> {
    return this.http.post(this.apiUrl + `/${documentId}/confirm`, { checksum });
  }
}

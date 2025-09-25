import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { AdminService } from 'app/services/admin/admin.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-home-admin',
  standalone: false,
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css',
})
export class HomeAdminComponent {
  file: File | null | undefined = null;
  uploading = false;
  uploadProgress: number = 0;
  message: string = '';

  constructor(private http: HttpClient, private uploadService: AdminService) {}

  onChangeFile(value: EventTarget | any) {
    this.file = value.files[0];
  }

  uploadFiles() {
    this.uploading = true;
    this.uploadProgress = 0;
    const formData = new FormData();
    if (this.file === null || this.file === undefined) {
      return;
    }
    formData.append('file', this.file);
    this.http
      .post('http://localhost:8081/file/upload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe({
        next: (event) => {
          console.log(event);
          // Événement de progression de l'upload
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round(
              (100 * event.loaded) / event.total
            );
          }
          // Événement de réponse finale (ICI ON RÉCUPÈRE LA VALEUR)
          else if (event.type === HttpEventType.Response) {
            console.log('Réponse complète du serveur :', event);
            // Vous pouvez maintenant utiliser la valeur
            // this.maVariable = serverResponse;
          }
        },
        error: (err) => {
          console.error('Upload error:', err);
          this.uploadProgress = 0;
        },
      });
  }
  async onUpload(): Promise<void> {
    if (!this.file) return;

    // Calculer le checksum (asynchrone)
    const checksum = await this.calculateSHA256(this.file);

    // 1. Demander l'URL pré-signée
    this.uploadService
      .getPresignedUrl(this.file.name, this.file.type, this.file.size)
      .pipe(
        switchMap((response: { documentId: string; presignedUrl: string }) => {
          const { documentId, presignedUrl } = response;

          // 2. Uploader vers S3 et suivre la progression
          return this.uploadService
            .uploadFileToS3(presignedUrl, this.file!)
            .pipe(
              tap((event) => {
                if (event.type === HttpEventType.UploadProgress) {
                  this.uploadProgress = Math.round(
                    100 * (event.loaded / event.total!)
                  );
                }
              }),
              // Une fois l'upload S3 terminé, confirmer auprès du backend
              switchMap((event) => {
                if (event.type === HttpEventType.Response) {
                  return this.uploadService.confirmUpload(documentId, checksum);
                }
                return []; // Ne rien faire pour les autres événements
              })
            );
        })
      )
      .subscribe({
        next: (result) => {
          if (result) {
            console.log('Upload confirmé avec succès !', result);
            // Mettre à jour l'UI
          }
        },
        error: (err) => {
          console.error("Erreur lors de l'upload", err);
          // Afficher un message d'erreur
          this.uploadProgress = 0;
        },
      });
  }

  // Fonction pour calculer le checksum
  private async calculateSHA256(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
}

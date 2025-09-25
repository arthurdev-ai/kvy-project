import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/services/admin/admin.service';

export interface DocumentType {
  checksum: string;
  createdAt: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  id: string;
  s3ObjectKey: string;
  status: string;
  updatedAt: string;
}
@Component({
  selector: 'app-list-kyc-doc',
  standalone: false,
  templateUrl: './list-kyc-doc.component.html',
  styleUrl: './list-kyc-doc.component.css',
})
export class ListKycDocComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  listDocument: DocumentType[] = [];
  isLoading: boolean = true;
  error: string = '';
  ngOnInit(): void {
    this.adminService.getDocuments().subscribe({
      next: (data) => {
        if (data) {
          this.listDocument = data.data;
          this.isLoading = false;
          console.log(data);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.error = 'An error occurred while fetching data';
        console.log('Error:', error);
      },
    });
  }
}

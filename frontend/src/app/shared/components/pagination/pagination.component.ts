import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() currentPage: number = 0;
  @Input() max: number = 10;
  @Input() totalPage: number = 1;
  @Output() onChangePage = new EventEmitter<number>();

  setCurrentPage(value: string) {
    if (!Number.isNaN(parseInt(value))) {
      this.onChangePage.emit(parseInt(value));
    }
  }

  getTotalPage() {
    const pageList: string[] = [];
    if (this.totalPage > -1) {
      for (let index = 0; index < this.totalPage + 1; index++) {
        if (this.currentPage > this.totalPage - Math.floor(this.max / 2)) {
          if (index >= this.totalPage - Math.floor(this.max / 2)) {
            pageList.push(index.toString());
          }
          if (index == this.currentPage - (Math.floor(this.max / 2) + 1)) {
            pageList.push('...');
          }
          if (index <= 2 && this.currentPage > Math.floor(this.max / 2)) {
            pageList.push(index.toString());
          }
        } else {
          if (this.currentPage < Math.floor(this.max / 2)) {
            if (index <= Math.floor(this.max / 2)) {
              pageList.push(index.toString());
            }
            if (index == Math.floor(this.max / 2) && this.currentPage > Math.floor(this.max / 2)) {
              pageList.push('...');
            }
            if (index >= this.totalPage - 1 && this.currentPage > Math.floor(this.max / 2)) {
              pageList.push(index.toString());
            }
          }
          if (this.currentPage >= Math.floor(this.max / 2)) {
            if (index == 1) {
              pageList.push(index.toString());
            }
            if (index == this.currentPage + 3) {
              pageList.push('...');
            }
            if (
              index >= this.currentPage - 2 &&
              index <= this.currentPage + 2
            ) {
              pageList.push(index.toString());
            }
            if (index == this.currentPage - 3) {
              pageList.push('...');
            }
            if (
              index > this.totalPage - 2 &&
              this.totalPage - 2 > this.currentPage - 3
            ) {
              pageList.push(index.toString());
            }
          }
        }
      }
    }
    return pageList;
  }
}

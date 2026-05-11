import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [  CommonModule ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges {
  @Input() pageNumber: number = 1;
  @Input() totalItem: number = 0;
  @Input() itemsPerPage: number = 5;
  @Input() showItem: number = 4;

  @Output() pageChanged = new EventEmitter<number>();


  totalPage: number = 0;
  pages: (number | string)[] = [];

  ngOnChanges(): void {
    this.totalPage = Math.ceil(this.totalItem / this.itemsPerPage);
    this.generatePages();
  }

  generatePages(): void {
    this.pages = [];

    let startPage = this.pageNumber - Math.floor(this.showItem / 2);
    let endPage = this.pageNumber + Math.floor(this.showItem / 2);

    if (startPage < 1) {
      startPage = 1;
      endPage = this.showItem;
    }

    if (endPage > this.totalPage) {
      endPage = this.totalPage;
      startPage = this.totalPage - this.showItem + 1;
      if (startPage < 1) startPage = 1;
    }

    if (startPage > 1) {
      this.pages.push(1);
      if (startPage > 2) {
        this.pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }

    if (endPage < this.totalPage) {
      if (endPage < this.totalPage - 1) {
        this.pages.push('...');
      }
      this.pages.push(this.totalPage);
    }
  }

  goToPage(page: number | string): void {
    if (typeof page === 'number' && page !== this.pageNumber) {
      this.pageChanged.emit(page);
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPage ) {
      this.pageChanged.emit(page);
    }
  }

  goToNextPage(): void {
    if (this.pageNumber < this.totalPage) {
      this.changePage(this.pageNumber + 1);
    }
  }

  goToPrevPage(): void {
    if (this.pageNumber > 1) {
      this.changePage(this.pageNumber - 1);
    }
  }


}

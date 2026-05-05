import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  @Input() currentPage = 0;
  @Input() totalPages = 0;
  @Input() totalElements = 0;
  @Input() itemsCount = 0;

  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() goToPage = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}

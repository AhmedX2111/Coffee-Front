import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { BranchesOrderService } from '../../services/BranchesOrderService/branches-order-service';
import { BranchResponse } from '../../models/Branch-Response';

@Component({
  selector: 'app-search-branches-order',
  imports: [],
  templateUrl: './search-branches-order.html',
  styleUrl: './search-branches-order.css',
})
export class SearchBranchesOrder {
  @Input() branches: BranchResponse[] = [];

  @Output() branchChanged = new EventEmitter<number>();
  @Output() searchChanged = new EventEmitter<string>();

  onBranchChange(event: any) {
    this.branchChanged.emit(+event.target.value);
  }

  onSearch(event: any) {
    this.searchChanged.emit(event.target.value);
  }



}

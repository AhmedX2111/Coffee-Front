import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { BranchesOrderService } from '../../services/BranchesOrderService/branches-order-service';
import { BranchesOrderResponse } from '../../models/Branches-Order-Response';
import { SearchBranchesOrder } from '../search-branches-order/search-branches-order';
import { BranchResponse } from '../../models/Branch-Response';

@Component({
  selector: 'app-branches-order',
  imports: [CommonModule , SearchBranchesOrder],
  templateUrl: './branches-order.html',
  styleUrl: './branches-order.css',
})
export class BranchesOrder implements OnInit {
   orders = signal<BranchesOrderResponse[]>([]);
  branches = signal<BranchResponse[]>([]);

  selectedBranchId = signal<number>(0);
  searchText = signal<string>('');

  constructor(private branchOrderService: BranchesOrderService) {}

  ngOnInit(): void {
    this.getAllBranches();
    this.loadOrders();
  }

  getAllBranches() {
    this.branchOrderService.getAllBranches().subscribe(res => {
      this.branches.set(res.data);
    });
  }

  loadOrders() {
    this.branchOrderService
      .getAllOrdersBranches(
        this.selectedBranchId(),
        this.searchText()
      )
      .subscribe(res => {
        this.orders.set(res.data);
      });
  }

onBranchChange(branchId: number) {
  this.selectedBranchId.set(branchId);
  this.loadOrders();
}

onSearch(search: string) {
  this.searchText.set(search);
  this.loadOrders();
}
}

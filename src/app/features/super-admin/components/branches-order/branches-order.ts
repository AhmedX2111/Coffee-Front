import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { BranchesOrderService } from '../../services/BranchesOrderService/branches-order-service';
import { BranchesOrderResponse } from '../../models/Branches-Order-Response';
import { SearchBranchesOrder } from '../search-branches-order/search-branches-order';
import { BranchResponse } from '../../models/Branch-Response';
import { PageResponse } from '../../models/PageResponse';
import { DateFilter } from '../date-filter/date-filter';
import { Pagination } from '../pagination/pagination';

@Component({
  selector: 'app-branches-order',
  imports: [CommonModule , SearchBranchesOrder , DateFilter , Pagination],
  templateUrl: './branches-order.html',
  styleUrl: './branches-order.css',
})
export class BranchesOrder implements OnInit {
   orders = signal<BranchesOrderResponse[]>([]);
  branches = signal<BranchResponse[]>([]);

  selectedBranchId = signal<number>(0);
  searchText = signal<string>('');

  currentPage = signal<number>(0);
  pageSize = signal<number>(2);
  totalPages = signal<number>(0);
  totalElements = signal<number>(0);

  selectedDate = signal<string>(''); 
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
        this.searchText(),
        this.selectedDate(),
        this.currentPage(),
        this.pageSize()
      )
      .subscribe(res => {
        console.log(res);
        const pageData: PageResponse<BranchesOrderResponse> = res.data;
        this.orders.set(pageData.content);
        this.totalPages.set(pageData.totalPages);
        this.totalElements.set(pageData.totalElements);
        if (this.currentPage() >= this.totalPages() && this.totalPages() > 0) {
          this.currentPage.set(this.totalPages() - 1);
          this.loadOrders();
        }
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


  nextPage() {
    if (this.currentPage() + 1 < this.totalPages()) {
      this.currentPage.update(page => page + 1);
      this.loadOrders();
    }
  }

  prevPage() {
    if (this.currentPage() > 0) {
      this.currentPage.update(page => page - 1);
      this.loadOrders();
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages()) {
      this.currentPage.set(page);
      this.loadOrders();
    }
  }

   onDateChange(date: string) {
    this.selectedDate.set(date);
    this.currentPage.set(0);
    this.loadOrders();
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { BranchService } from '../../../super-admin/services/BranchService/branch-service.ts';
import { AdminBranchResponse } from '../../../super-admin/models/branch';
import { CommonModule } from '@angular/common';
import { BranchStats } from '../branch-stats-component/branch-stats.js';

@Component({
  selector: 'app-branch-profile',
  imports: [CommonModule , BranchStats],
  templateUrl: './branch-profile.html',
  styleUrl: './branch-profile.css',
})
export class BranchProfile implements OnInit {

  branchData = signal<AdminBranchResponse | null>(null);

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.fetchMyBranch();
  }

  fetchMyBranch(): void {
    this.branchService.getMyBranch().subscribe({
      next: (response) => {
        console.log(response);
        this.branchData.set(response.data);
        console.log(this.branchData);
      },
      error: (err) => {
        console.error('Error fetching branch:', err);
      },
    });
  }
}
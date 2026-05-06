import { Component, OnInit, signal } from '@angular/core';
import { BranchService } from '../../../services/BranchService/branch-service.ts.js';
import { ToastrService } from 'ngx-toastr';
import { AdminBranchResponse } from '../../../models/branch.js';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-branch',
  imports: [RouterLink],
  templateUrl: './list-branch.html',
  styleUrl: './list-branch.css',
})
export class ListBranch implements OnInit{

branches = signal<AdminBranchResponse[] | undefined>(undefined);

 constructor (private branchService: BranchService , private toastr: ToastrService , private router: Router) { 

  }

  ngOnInit(): void {
    this.getAllBranches();
  }
// get all branches
  getAllBranches(){
    this.branchService.getAllBranches().subscribe({
      next: (res) => {
        if (res.success) {
          this.branches.set(res.data);
        }
      }
    });
  }
//
  deleteBranch(id: String) {
    this.branchService.deleteBranch(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.branches.update(list => list ? list.filter(a => a.id !== id) : undefined);
        } else {
          this.toastr.error(res.message);
        }
      },
      error: () => {
        this.toastr.error('Something went wrong');
      }
    });
  } 

editBranch(branchId : String) {
  this.router.navigate(['/super-admin/add-branch', branchId]);
}
}


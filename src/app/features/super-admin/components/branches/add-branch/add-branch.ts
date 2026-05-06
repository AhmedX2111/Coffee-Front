import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchService } from '../../../services/BranchService/branch-service.ts.js';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-branch',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-branch.html',
  styleUrl: './add-branch.css',
})
export class AddBranch implements OnInit {
  hidePassword: boolean = true;
  branchId !: String;
  branchForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private branchService: BranchService, private toastr: ToastrService, private router: ActivatedRoute) {
    this.branchForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^(010|011|012|015)[0-9]{8}$')]],
      branchAdmin: this.fb.group({
        name: ['', [ Validators.required,  Validators.minLength(3), Validators.maxLength(20)]],
        phone: ['', [ Validators.required,  Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^(010|011|012|015)[0-9]{8}$')]],
        email: ['', [ Validators.required,  Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
        password: ['', [ Validators.required,  Validators.minLength(6)]],
      }),
    });

  }// end od constructor 
  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.editData(id);
      this.branchId = id;
    }
  }

  editData(branchId: String) {
    this.branchService.getOneBranch(branchId).subscribe({
      next: (response) => {
        // console.log('get one branch' , response);
        // 1. Fill the form with data
        this.branchForm.patchValue(response.data);

        // 2. Disable the branchAdmin nested group
       // this.branchForm.get('branchAdmin')?.disable();
      }
    })
  }

  submitBranch() {

    if (this.branchForm.invalid) {
      this.toastr.error('Please fill all required fields correctly');
      return;
    }
    const formValue = this.branchForm.value;
    if (this.isEditMode) {
      this.branchService.updateBranch(this.branchId, formValue).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success(res.message);
            //this.router.navigate(['/super-admin/branch-list']);
          } else {
            this.toastr.error(res.message);
          }
        },
        error: (err) => {
          console.log(err);
          const msg = err.error?.message || 'Something went wrong';
          this.toastr.error(msg);
        },
      });
    } else {
      this.branchService.addBranch(formValue).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success(res.message);
            this.branchForm.reset();
          } else {
            this.toastr.error(res.message);
          }
        },
        error: (err) => {
          console.log(err);
          const msg = err.error?.message || 'Something went wrong';
          this.toastr.error(msg);
        },
      });
    }


    /*    if (this.branchForm.invalid) {
         return;
       } else {
         console.log(this.branchForm.value);
       } */
  }// end of submitBranch
  // Inside your component class
  get managerControls() {
    return (this.branchForm.get('branchAdmin') as FormGroup).controls;
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}

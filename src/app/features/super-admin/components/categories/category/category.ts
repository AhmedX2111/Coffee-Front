import { CategoryService } from './../../../services/CategoryService/category-service.ts';
import { AddonResponse } from './../../../models/addon-response';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { MultiSelected } from '../../../shared/multi-selected/multi-selected.js';
import { CommonModule } from '@angular/common';
import { AddonService } from '../../../services/AddonService/addon-service';

@Component({
  selector: 'app-category',
  imports: [MultiSelected , ReactiveFormsModule , CommonModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
   selectedAddonIds = signal<number[]>([]);
// ... existing signals
isLoading = signal(false);
  categoryId !: String;
 categoryForm: FormGroup;
  isEditMode = false;
 // 1. Initialize the signal with an empty array
  availableAddons = signal<AddonResponse[]>([]);

   addonOptions =  computed(() => 
  this.availableAddons().map(a => ({ label: a.name, value: a.id }))
);;
  // constructor
   constructor(private fb: FormBuilder, private categoryService: CategoryService, private toastr: ToastrService, private router: ActivatedRoute , private addonService : AddonService) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', [Validators.required, Validators.minLength(5)]],
     
     
    });

  }// end of constructor 
  ngOnInit(): void {
    this.getAllAddons();
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.editData(id);
      this.categoryId = id;
    }
  }

   getAllAddons() {
    this.addonService.getAllAddons().subscribe((res) => {
      this.availableAddons.set(res.data);
    });
  }
// get one category from db
  editData(categoryId: String) {
    this.categoryService.getOneCategory(categoryId).subscribe({
      next: (response) => {
         console.log('get one category' , response);
        // 1. Fill the form with data
        this.categoryForm.patchValue(response.data);
this.selectedAddonIds.set(response.data.addonList.map(a => a.id)); // Set the selected addon IDs in the signal
        
      }
    })
  }

  submitCategory() {

    if (this.categoryForm.invalid) {
      this.toastr.error('Please fill all required fields correctly');
      return;
    }

    // 2. Validate the Signal (selectedAddonIds) is NOT empty
  if (this.selectedAddonIds().length === 0) {
    this.toastr.error('Please select at least one addon');
    return;
  }
 //   const formValue = this.categoryForm.value;
 this.isLoading.set(true); // Start loading
    // Construct the payload according to your requirement
    const payload = {
      name: this.categoryForm.value.name,
      imageUrl: this.categoryForm.value.imageUrl,
      addonList: this.selectedAddonIds(), // Get values from the signal
    };
    if (this.isEditMode) {
      this.categoryService.updateCategory(this.categoryId, payload).subscribe({
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
      this.categoryService.addCategory(payload).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success(res.message);
            
            this.categoryForm.reset();
             this.selectedAddonIds.set([]); 
             this.isLoading.set(false); // end loading
          } else {
            this.toastr.error(res.message);
            this.isLoading.set(false); // end loading
          }
        },
        error: (err) => {
         // console.log(err);
          const msg = err.error?.message || 'Something went wrong';
          this.toastr.error(msg);
          this.isLoading.set(false); // end loading
        },
      });
    }


    /*    if (this.branchForm.invalid) {
         return;
       } else {
         console.log(this.branchForm.value);
       } */
  }// end of submitBranch



}

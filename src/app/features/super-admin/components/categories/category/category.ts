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
  imports: [MultiSelected, ReactiveFormsModule, CommonModule],
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
  imagePreview = signal<string | null>(null);
  isDragging = signal(false);
  fileName = signal<string | null>(null);
  // 1. Initialize the signal with an empty array
  availableAddons = signal<AddonResponse[]>([]);

  addonOptions = computed(() =>
    this.availableAddons().map(a => ({ label: a.name, value: a.id }))
  );;
  // constructor
  constructor(private fb: FormBuilder, private categoryService: CategoryService, private toastr: ToastrService, private router: ActivatedRoute, private addonService: AddonService) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: [null],

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
        // 1. Fill the form with data
       // this.categoryForm.patchValue(response.data);
        this.selectedAddonIds.set(response.data.addonList.map(a => a.id)); // Set the selected addon IDs in the signal
this.categoryForm.patchValue({
          name: response.data.name,
         
          imageUrl:response.data.imageUrl
        });
        this.imagePreview.set(response.data.imageUrl);
         this.fileName.set(response.data.imageUrl.split('/').pop() || null);  
      
      
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

    const formData = new FormData();

    // basic fields
    formData.append('name', this.categoryForm.value.name);

    this.selectedAddonIds().forEach((addonId, index) => {
      formData.append(`addonList[${index}]`, addonId.toString());
    });
    // image file
    const file = this.categoryForm.value.imageUrl;
    if (file instanceof File) {
      formData.append('imageUrl', file); // changed to match MultipartFile imageUrl in DTO
    }
   // console.log('Form Data to be sent:', formData.get('imageUrl')); // Debug log
    if (this.isEditMode) {
      this.categoryService.updateCategory(this.categoryId, formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success(res.message);
            //this.router.navigate(['/super-admin/branch-list']);
          } else {
            this.toastr.error(res.message);
          }
        },
        error: (err) => {
          const msg = err.error?.message || 'Something went wrong';
          this.toastr.error(msg);
        },
      });
    } else {
      this.categoryService.addCategory(formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success(res.message);

            this.categoryForm.reset();
            this.selectedAddonIds.set([]);
            this.imagePreview.set(null);
            this.fileName.set(null);
            this.isLoading.set(false); // end loading
          } else {
            this.toastr.error(res.message);
            this.isLoading.set(false); // end loading
          }
        },
        error: (err) => {
          const msg = err.error?.message || 'Something went wrong';
          this.toastr.error(msg);
          this.isLoading.set(false); // end loading
        },
      });
    }

  }// end of submitBranch

  /* images handling */
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.processFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    const files = event.dataTransfer?.files;
    if (files && files[0]) {
      this.processFile(files[0]);
    }
  }

  private processFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    this.fileName.set(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview.set(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    this.categoryForm.patchValue({ imageUrl: file });
  }

  removeImage() {
    this.imagePreview.set(null);
    this.fileName.set(null);
    this.categoryForm.patchValue({ imageUrl: null });
  }


}

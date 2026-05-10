import { AdminProductRequest, sizeOptions } from './../../../models/product';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminCategoryResponse } from '../../../models/category';
import { CategoryService } from '../../../services/CategoryService/category-service.ts';
import { ProductSize } from '../../../models/product';
import { ProductService } from '../../../services/ProductService/product-service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, RouterLink } from '@angular/router';




@Component({
  selector: 'app-product',
  imports: [ReactiveFormsModule, CommonModule , RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})


export class Product implements OnInit {
  productForm: FormGroup;
  imagePreview = signal<string | null>(null);
  isDragging = signal(false);
  fileName = signal<string | null>(null);
productId !: String;
  categories = signal<AdminCategoryResponse[] | undefined>(undefined);
isEditMode = false;

  sizeOptions: sizeOptions[] = [
    { label: 'Small (S)', value: 'small' },
    { label: 'Medium (M)', value: 'medium' },
    { label: 'Large (L)', value: 'large' },
    { label: 'Extra Large (XL)', value: 'xlarge' },
  ];

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private productService: ProductService, private toastr: ToastrService,private router: ActivatedRoute) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      image: [null],
      description: ['Hot cappuccino with milk foam', Validators.required],
      productSizes: this.fb.array([this.createPricing()])
    });
  }
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
      }
    });

    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.editData(id);
      this.productId = id;
    }
  }

// get one category from db
  editData(productId: String) {
    this.productService.getOneProduct(productId).subscribe({
      next: (response) => {
        // 1. Fill the form with data
        this.productForm.setControl('productSizes', this.fb.array(response.data.productSizes.map(ps => this.fb.group({
          
          size: [ps.size, Validators.required],
          price: [ps.price, [Validators.required, Validators.min(0)]] 
        
      }))));
        this.productForm.patchValue({
          name: response.data.name,
          category: response.data.category.id,
          description: response.data.description,
          image:response.data.imageUrl
        });
        this.imagePreview.set(response.data.imageUrl);
         this.fileName.set(response.data.imageUrl.split('/').pop() || null);  
      
      }
    });
  }


  get productSizes(): FormArray {
    return this.productForm.get('productSizes') as FormArray;
  }

  createPricing() {
    return this.fb.group({
      size: ['medium', Validators.required],
      price: [4.5, [Validators.required, Validators.min(0)]]
    });
  }

  addPricing() {
    this.productSizes.push(this.createPricing());
  }

  removePricing(index: number) {
    if (this.productSizes.length > 1) {
      this.productSizes.removeAt(index);
    }
  }

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
    this.productForm.patchValue({ image: file });
  }

  removeImage() {
    this.imagePreview.set(null);
    this.fileName.set(null);
    this.productForm.patchValue({ image: null });
  }

  onCancel() {
    this.productForm.reset( {
      name: '',
      category: '',
      image: null,
      description: 'Hot cappuccino with milk foam',
      productSizes: [this.createPricing().value]
    });
    this.imagePreview.set(null);
    this.fileName.set(null);
    while (this.productSizes.length > 1) {
      this.productSizes.removeAt(1);
    }
  }
  // save product to db
  onSave() {
    if (this.productForm.valid) {
    /*   const sendData: AdminProductRequest = {
        ...this.productForm.value,
        category: {
          id: this.productForm.value.category // assuming the form value is just the ID
        }
      } */
      const formData = new FormData();

    // basic fields
    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);

    // category (nested)
    formData.append('category.id', this.productForm.value.category);

    // image file
   const file = this.productForm.value.image;
    if (file instanceof File) {
      formData.append('imageUrl', file); // must match backend field name
    }

    // productSizes (IMPORTANT PART)
    this.productSizes.controls.forEach((group, index) => {
      formData.append(`productSizes[${index}].size`, group.value.size);
      formData.append(`productSizes[${index}].price`, group.value.price);
    });

     if (this.isEditMode) {
 this.productService.updateProduct(this.productId, formData).subscribe({
        next: (res) => {
          this.toastr.success(res.message);
           this.onCancel();
        }
         ,
        error: (err) => {
          this.toastr.error(err.message);
        }
      });
     }else{
      this.productService.addProduct(formData).subscribe({
        next: (res) => {
          this.toastr.success(res.message);
           this.onCancel();
        }
         ,
        error: (err) => {
          this.toastr.error(err.message);
        }
      });
     }
      
    } else {
      this.productForm.markAllAsTouched();
        this.toastr.warning('Please fill in all required fields');
    }
  }
}


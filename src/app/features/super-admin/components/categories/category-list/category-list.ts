import { Component, OnInit, signal } from '@angular/core';
import { CategoryService } from '../../../services/CategoryService/category-service.ts';
import { AdminCategoryResponse } from '../../../models/category.js';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit {

categories = signal<AdminCategoryResponse[] | undefined>(undefined);

  constructor( private categoryService: CategoryService , private toastr: ToastrService) {
    
     
   }
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
         if (res.success) {
          this.categories.set(res.data);
        }
      }
    })
  }
deleteCategory(id: String) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.categories.update(list => list ? list.filter(a => a.id !== id) : undefined);
        } else {
          this.toastr.error(res.errors);
        }
      },
      error: (res) => {
       // console.error(res);
        this.toastr.error(res.error.errors);
      }
    });
  } 

}



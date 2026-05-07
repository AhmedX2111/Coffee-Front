import { Component, OnInit, signal } from '@angular/core';
import { CategoryService } from '../../../services/CategoryService/category-service.ts';
import { AdminCategoryResponse } from '../../../models/category.js';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit {

categories = signal<AdminCategoryResponse[] | undefined>(undefined);

  constructor( private categoryService: CategoryService) {
    
     
   }
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        console.log('get all categories' , res);
         if (res.success) {
          this.categories.set(res.data);
        }
      }
    })
  }

}



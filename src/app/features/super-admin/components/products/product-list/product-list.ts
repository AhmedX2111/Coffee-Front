import { Component, OnInit, signal } from '@angular/core';
import { AdminProductResponse } from '../../../models/product';
import { ProductService } from '../../../services/ProductService/product-service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink , PaginationComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
products = signal<AdminProductResponse[] | undefined>(undefined);
 toggleRow:boolean=false;
  currentPage = 1;
  totalItems = 30;
  itemsPerPage = 5 ;
  constructor( private productService: ProductService , private toastr: ToastrService) {
    
     
   }
  ngOnInit(): void {
   this.productService.getAllProducts(  this.currentPage,
        this.itemsPerPage).subscribe({
      next: (res) => {
        
         if (res.success) {
          console.log('get all products' , res.data.number);
          this.products.set(res.data.content);
this.totalItems= res.data.totalElements;
this.itemsPerPage = res.data.size;
this.currentPage=res.data.number+1;
        }
      }
    })
  }

  
/* if (category.totalCategory) {
        this.totalCategory = category.totalCategory;
      } */
  changeToggleRow(){
    this.toggleRow=!this.toggleRow;
  
  }
  onPageSizeChange(event: Event) {
    this.itemsPerPage = +(event.target as HTMLSelectElement).value;
    //this.currentPage = 1;
    
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.productService.getAllProducts(  this.currentPage,
        this.itemsPerPage).subscribe({
      next: (res) => {
        
         if (res.success) {
          console.log('get all products onPageChange ' , res);
          this.products.set(res.data.content);


        }
      }
    })
  }

deleteProduct(id: String) {
    this.productService.deleteProduct(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.products.update(list => list ? list.filter(a => a.id !== id) : undefined);
        } else {
          this.toastr.error(res.message);
        }
      },
      error: () => {
        this.toastr.error('Something went wrong');
      }
    });
  } 
}

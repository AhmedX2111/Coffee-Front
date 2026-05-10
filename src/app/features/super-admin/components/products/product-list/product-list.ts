import { Component, OnInit, signal } from '@angular/core';
import { AdminProductResponse } from '../../../models/product';
import { ProductService } from '../../../services/ProductService/product-service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
products = signal<AdminProductResponse[] | undefined>(undefined);

  constructor( private productService: ProductService , private toastr: ToastrService) {
    
     
   }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
         if (res.success) {
          this.products.set(res.data);
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

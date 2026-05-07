import { Component, OnInit, signal } from '@angular/core';
import { AdminProductResponse } from '../../../models/product';
import { ProductService } from '../../../services/ProductService/product-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
products = signal<AdminProductResponse[] | undefined>(undefined);

  constructor( private productService: ProductService) {
    
     
   }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        console.log('get all products' , res);
         if (res.success) {
          this.products.set(res.data);
        }
      }
    })
  }

}

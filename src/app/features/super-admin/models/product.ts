import { AdminCategoryResponse } from "./category";

export interface AdminProductRequest {
    
    name: string,
//  imageUrl: string,
   description:string,
   category: {id:number},
   productSizes:ProductSize[]
  
}

export interface AdminProductResponse {
   id: string,
        name: string,
        description: string,
        imageUrl: string,
        category: AdminCategoryResponse,

        productSizes: ProductSize[]
}

export interface ProductSize {
  size: string;
  price: number;
}

export interface sizeOptions {
  label: string;
  value: string;
}
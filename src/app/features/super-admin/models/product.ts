import { AdminCategoryResponse } from "./category";

export interface AdminProductRequest {
    
    name: string,
//  imageUrl: string,
   description:string,
   category: {id:number},
   productSizes:ProductSize[]
  
}

export interface AdminProductResponsePagination {
content :AdminProductResponse[],
size:number,
totalElements: number,
totalPages: number,
number: number

 
 
  
}

export interface AdminProductResponse {

  id: string,
        name: string,
        description: string,
        imageUrl: string,
        isAvailable?: boolean,
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
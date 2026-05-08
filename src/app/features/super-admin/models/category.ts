import { AddonResponse } from "./addon-response"

export interface AdminCategoryRequest {
    
    name: string,
  imageUrl: string,
   addonList:number[]
  
}

export interface AdminCategoryResponse {
    id: string,
    name: string,
  imageUrl: string,
  addonList : AddonResponse[]
}
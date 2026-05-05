import { RegisterRequest } from "../../../core/models/auth.model";

export interface AdminBranchRequest {
    
    name: string,
  address: string,
  phone: string,
  branchAdmin: RegisterRequest
}

export interface AdminBranchResponse {
    id: string,
    name: string,
  address: string,
  phone: string,
  branchAdmin: RegisterRequest
}
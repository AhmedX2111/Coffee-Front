export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  latitude?: number;
  longitude?: number;
  isActive: boolean;
  managerId?: string;
  openingTime: string;
  closingTime: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BranchManager {
  id: string;
  userId: string;
  branchId: string;
  branch?: Branch;
  joinedAt: Date;
  role: 'manager' | 'supervisor';
}

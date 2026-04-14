export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserResponse {
  email: string;
  name: string;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: any;
  timestamp: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterResponse {
  email: string;
  name: string;
  role: string;
}
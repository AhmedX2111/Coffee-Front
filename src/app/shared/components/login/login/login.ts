import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = false;
  errorMessage = '';

  onSubmit(): void {
     if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.toastr.success('Login successful 🎉', 'Success');
          if (response.success && response.data && response.data.token) {
            this.authService.saveToken(response.data.token);
            this.authService.saveUser(response.data);

            const userRole = this.authService.getUserRole();
            console.log(userRole);
            if (userRole === 'ADMIN') {
              this.router.navigate(['/admin/dashboard']);
            } else if (userRole === 'BRANCH_MANAGER') {
              this.router.navigate(['/branch-manager/dashboard']);
            } else {
              this.router.navigate(['/customer/dashboard']);
            }
          }
          console.log('Login successful:', response);
        },
        error: (error) => {
          console.log(error);
          this.toastr.success('Login failed 🎉', 'Failed');
          this.errorMessage = error.error?.message || 'Invalid email or password';
          this.isLoading = false;
        }
      });
    }
  }

}

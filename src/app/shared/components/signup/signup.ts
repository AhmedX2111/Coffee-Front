import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule , CommonModule , RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
    hidePassword: boolean = true;

  signupForm: FormGroup;
   message : string = '';
constructor(private fb: FormBuilder, private authService: AuthService ,  private toastService: ToastrService , private router: Router) {
  this.signupForm = this.fb.group({
    name: ['',[ Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    phone: ['' ,[ Validators.required ,Validators.minLength(11), Validators.maxLength(11) , Validators.pattern('^(010|011|012|015)[0-9]{8}$')]],
    email: ['' , [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['' , [Validators.required , Validators.minLength(6)]],
  });
} // end of constructor

signupSubmit() {

   if (!this.signupForm.invalid) {
  //console.log('Signup form submitted:', this.signupForm.value);
  this.authService.register(this.signupForm.value).subscribe({
    next: (response) => {
      //console.log('Registration successful:', response);
       this.toastService.success('Registration successful! Please log in.', 'Success');
        this.router.navigate(['/login']);
     this.signupForm.reset();
      },
    error: (error) => {
    
      this.toastService.error('Registration failed. Please try again.', 'Error');
    },
  });
}
}//end of signupSubmit

get signupF() {
    return this.signupForm.controls;
  }
blockArabic(event: KeyboardEvent) {
  const char = event.key;
  // إذا الحرف عربي، يمنع الكتابة
  if (char.match(/[\u0600-\u06FF]/)) {
    event.preventDefault();
  }
}
 togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}

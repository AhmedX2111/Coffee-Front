import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: `
    <button (click)="onLogout()" [class]="buttonClass()" [title]="title()">
      <ng-content></ng-content>
    </button>
  `
})
export class Logout {
  private authService = inject(AuthService);
  private router = inject(Router);

  buttonClass = input<string>('');
  title = input<string>('Logout');

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.authService.localLogout();
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
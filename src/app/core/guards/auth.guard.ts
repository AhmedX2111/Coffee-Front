import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Functional Auth Guard — protects routes that require authentication.
 *
 * Usage:
 *   { path: 'dashboard', canActivate: [authGuard], component: DashboardComponent }
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasToken()) {
    return true;
  }

  // Preserve the attempted URL so we can redirect back after login (optional)
  return router.createUrlTree(['/auth/login']);
};

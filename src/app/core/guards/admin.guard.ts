import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  private toast = inject(ToastrService);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.hasToken()) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (this.authService.isSuperAdmin()) {
      return true;
    }

    this.router.navigate(['/auth/']);
    this.toast.error('You are not authorized to access this page.', 'Unauthorized');
    return false;
  }
}

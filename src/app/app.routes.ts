import { Routes } from '@angular/router';
import { CustomerGuard } from './core/guards/customer.guard';
import { BranchManagerGuard } from './core/guards/branch-manager.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'customer',
    canActivate: [CustomerGuard],
    loadChildren: () =>
      import('./features/customer/customer.routes').then(
        (m) => m.CUSTOMER_ROUTES
      ),
  },
  {
    path: 'branch-manager',
    canActivate: [BranchManagerGuard],
    loadChildren: () =>
      import('./features/branch-manager/branch-manager.routes').then(
        (m) => m.BRANCH_MANAGER_ROUTES
      ),
  },
  {
    path: 'super-admin',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./features/super-admin/super-admin.routes').then(
        (m) => m.SUPER_ADMIN_ROUTES
      ),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];

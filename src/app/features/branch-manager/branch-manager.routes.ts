import { Routes } from '@angular/router';

export const BRANCH_MANAGER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'active-orders',
    loadComponent: () =>
      import('./components/active-orders/active-orders.component').then(
        (m) => m.ActiveOrdersComponent
      ),
  },
  {
    path: 'completed-orders',
    loadComponent: () =>
      import('./components/completed-orders/completed-orders.component').then(
        (m) => m.CompletedOrdersComponent
      ),
  },
  {
    path: 'branch-profile',
    loadComponent: () =>
      import('./components/branch-profile/branch-profile.component').then(
        (m) => m.BranchProfileComponent
      ),
  },
];

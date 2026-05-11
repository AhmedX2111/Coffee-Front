import { Routes } from '@angular/router';

export const BRANCH_MANAGER_ROUTES: Routes = [
{
    path: '',
    loadComponent: () => import('../branch-manager/layout/layout-manager').then(m => m.LayoutManager),
    children: [
      { path: '', redirectTo: 'active', pathMatch: 'full' },
      { path: 'active', loadComponent: () => import('./components/order-card/order-card').then(m => m.OrderCard) },
      { path: 'ready-orders', loadComponent: () => import('./components/Ready-orders/Ready-orders').then(m => m.ReadyOrders) },
      { path: 'completed-orders', loadComponent: () => import('./components/completed-orders/completed-orders').then(m => m.CompletedOrders) },
      {path: 'profile', loadComponent: () => import('./components/branch-profile/branch-profile').then((m) => m.BranchProfile)},
    ]
  }
];

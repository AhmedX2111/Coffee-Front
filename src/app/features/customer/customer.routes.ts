import { Routes } from '@angular/router';
import { Customer } from './layout/customer';

export const CUSTOMER_ROUTES: Routes = [
    { 
    path: '',
    loadComponent: () => import('./layout/customer').then((m) => m.Customer),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../customer/components/branch-home/branch-home').then(m => m.BranchHome),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../customer/components/cart/cart').then(m => m.Cart),
      },
    ],
  },
];

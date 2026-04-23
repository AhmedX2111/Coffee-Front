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
          import('../customer/components/landing/landing').then(m => m.Landing),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('../customer/components/product-detail/product-detail').then(m => m.ProductDetail),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../customer/components/cart/cart').then(m => m.Cart),
      },
      // {
      //   path: 'orders',
      //   loadComponent: () =>
      //     import('../customer/components/order-history/order-history').then(m => m.OrderHistory),
      // },
      // {
      //   path: 'profile',
      //   loadComponent: () =>
      //     import('../customer/components/profile/profile').then(m => m.Profile),
      // },
    ],
  },
];

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
        path: 'menu',
        loadComponent: () =>
          import('../customer/components/menu-page/menu-page').then(m => m.MenuPage),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../customer/components/cart/cart').then(m => m.CartPage),
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

       {
        path: 'checkout',
        loadComponent: () =>
          import('../customer/components/checkout/checkout').then((m) => m.CheckoutPage),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('../customer/components/orders/orders').then((m) => m.OrdersPage),
      },
      {
        path: 'order-details/:id',
        loadComponent: () =>
        import('../customer/components/orderdetails/orderdetails').then((m) => m.OrderDetailsPage),
},
    ],
  },
];

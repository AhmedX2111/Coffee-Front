import { Routes } from '@angular/router';

export const SUPER_ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../super-admin/layout-admin/layout-admin').then((m) => m.Layout),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../super-admin/components/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'addon-list',
        loadComponent: () =>
          import('./components/addon/addon-list/addon-list').then((m) => m.AddonList),
      },
      {
        path: 'addon',
        loadComponent: () =>
          import('./components/addon/add-addon/add-addon').then((m) => m.AddAddon),
      },
      {
        path: 'addon/:id',
        loadComponent: () =>
          import('./components/addon/add-addon/add-addon').then((m) => m.AddAddon),
      },
      {
        path: 'staff-list',
        loadComponent: () =>
          import('./components/staff-list/staff-list').then((m) => m.StaffList),
      },
      {
        path: 'branch-order',
        loadComponent: () =>
          import('./components/branches-order/branches-order').then((m) => m.BranchesOrder),
      },
    ],
  },
];

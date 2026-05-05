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

      // branches routes
       {
        path: 'branches',
        loadComponent: () =>
          import('./components/branches/list-branch/list-branch').then((m) => m.ListBranch),
      },
       { // add new branch
        path: 'branches/add',
        loadComponent: () =>
          import('./components/branches/add-branch/add-branch').then((m) => m.AddBranch),
      },// edit branch
       {
        path: 'branches/update/:id',
        loadComponent: () =>
          import('./components/branches/add-branch/add-branch').then((m) => m.AddBranch),
      },

      // categories routes
     
       {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/category-list/category-list').then((m) => m.CategoryList),
      },
       { // add new category
        path: 'categories/add',
        loadComponent: () =>
          import('./components/categories/category/category').then((m) => m.Category),
      },// edit category
       {
        path: 'categories/update/:id',
        loadComponent: () =>
          import('./components/categories/category/category').then((m) => m.Category),
      },
    ],
  },
];

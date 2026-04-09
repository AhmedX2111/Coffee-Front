import { Routes } from '@angular/router';

export const SUPER_ADMIN_ROUTES: Routes = [
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
    path: 'branches',
    loadComponent: () =>
      import('./components/branches/branches-list/branches-list.component').then(
        (m) => m.BranchesListComponent
      ),
  },
  {
    path: 'branches/new',
    loadComponent: () =>
      import('./components/branches/new-branch/new-branch.component').then(
        (m) => m.NewBranchComponent
      ),
  },
  {
    path: 'branches/:id/edit',
    loadComponent: () =>
      import('./components/branches/edit-branch/edit-branch.component').then(
        (m) => m.EditBranchComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./components/users/users-list/users-list.component').then(
        (m) => m.UsersListComponent
      ),
  },
  {
    path: 'users/new',
    loadComponent: () =>
      import('./components/users/new-user/new-user.component').then(
        (m) => m.NewUserComponent
      ),
  },
  {
    path: 'users/:id/edit',
    loadComponent: () =>
      import('./components/users/edit-user/edit-user.component').then(
        (m) => m.EditUserComponent
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./components/categories/categories-list/categories-list.component').then(
        (m) => m.CategoriesListComponent
      ),
  },
  {
    path: 'categories/new',
    loadComponent: () =>
      import('./components/categories/new-category/new-category.component').then(
        (m) => m.NewCategoryComponent
      ),
  },
  {
    path: 'categories/:id/edit',
    loadComponent: () =>
      import('./components/categories/edit-category/edit-category.component').then(
        (m) => m.EditCategoryComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/products/products-list/products-list.component').then(
        (m) => m.ProductsListComponent
      ),
  },
  {
    path: 'products/add',
    loadComponent: () =>
      import('./components/products/add-product/add-product.component').then(
        (m) => m.AddProductComponent
      ),
  },
  {
    path: 'products/:id/edit',
    loadComponent: () =>
      import('./components/products/edit-product/edit-product.component').then(
        (m) => m.EditProductComponent
      ),
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./components/analytics/overview/overview.component').then(
        (m) => m.OverviewComponent
      ),
  },
];

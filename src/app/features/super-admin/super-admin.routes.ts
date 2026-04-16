import { Routes } from '@angular/router';

export const SUPER_ADMIN_ROUTES: Routes = [
  {
    path:'',
    loadComponent:()=> import('../super-admin/layout-admin/layout-admin').then((m)=>m.Layout),
    children:[
        {
            path:'',
            loadComponent:()=> import('../super-admin/components/dashboard/dashboard').then((m)=>m.Dashboard)
        },
        {
            path:'add-product',
            loadComponent:()=> import('../super-admin/components/products/add-product/add-product').then((m)=>m.AddProduct),
        }
    ]
  }
];

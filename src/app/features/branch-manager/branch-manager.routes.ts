import { Routes } from '@angular/router';

export const BRANCH_MANAGER_ROUTES: Routes = [
   {
    path:'',
    loadComponent:() => import('../branch-manager/layout/layout-manager').then((m)=> m.LayoutManager),
    children:[
        {
            path:'',
            loadComponent:() => import('./components/order-card/order-card').then((m)=>m.OrderCard)
        },
    ]
   }
];

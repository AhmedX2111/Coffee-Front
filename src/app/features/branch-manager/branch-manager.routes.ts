import { Routes } from '@angular/router';

export const BRANCH_MANAGER_ROUTES: Routes = [
   {
    path:'',
    loadComponent:() => import('../branch-manager/layout/layout-manager').then((m)=> m.LayoutManager),
    children:[
        {
            path:'',
            loadComponent:() => import('../branch-manager/components/active-orders/active-orders').then((m)=>m.ActiveOrders)
        },
        {
            path:'branch-profile',
            loadComponent:() => import('../branch-manager/components/branch-profile/branch-profile').then((m)=>m.BranchProfile)
        }
    ]
   }
];

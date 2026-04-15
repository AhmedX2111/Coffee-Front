import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () => import('../../shared/components/login/login/login').then((m) => m.Login),
  },
  {
    path: 'sign',
    loadComponent: () => import('../../shared/components/signup/signup').then((m) => m.Signup),
  },
];

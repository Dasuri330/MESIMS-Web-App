import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'sign-in',
    title: 'Sign in to MESIMS',
    loadComponent: () =>
      import('./sign-in.component/sign-in.component')
        .then((m) => m.SignInComponent),
  },
];

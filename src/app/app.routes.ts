import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../features/main/public/public.routes')
        .then((m) => m.PUBLIC_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../features/auth/auth.routes')
        .then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'app',
    loadChildren: () =>
      import('../features/main/secure/secure.routes')
        .then((m) => m.SECURE_ROUTES),
  },
  { path: '**', redirectTo: '' },
];

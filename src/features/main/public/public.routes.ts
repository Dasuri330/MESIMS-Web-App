import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    title: 'Meridian Elementary School — Information Management System',
    loadComponent: () =>
      import('./landing.component/landing.component')
        .then((m) => m.LandingComponent),
  },
  {
    path: 'learn-more',
    title: 'How MESIMS works',
    loadComponent: () =>
      import('./learn-more.component/learn-more.component')
        .then((m) => m.LearnMoreComponent),
  },
];

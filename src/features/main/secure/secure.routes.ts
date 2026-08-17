import { Routes } from '@angular/router';

export const SECURE_ROUTES: Routes = [
  {
    path: 'teacher/dashboard',
    title: 'Teacher dashboard — MESIMS',
    loadComponent: () =>
      import('./teacher-dashboard.component/teacher-dashboard.component')
        .then((m) => m.TeacherDashboardComponent),
  },
  // {
  //   path: 'admin/dashboard',
  //   title: 'Admin dashboard — MESIMS',
  //   loadComponent: () =>
  //     import('./admin-dashboard.component/admin-dashboard.component')
  //       .then((m) => m.AdminDashboardComponent),
  // },
  // {
  //   path: 'parent/dashboard',
  //   title: 'Parent dashboard — MESIMS',
  //   loadComponent: () =>
  //     import('./parent-dashboard.component/parent-dashboard.component')
  //       .then((m) => m.ParentDashboardComponent),
  // },
  // {
  //   path: 'student/dashboard',
  //   title: 'Student dashboard — MESIMS',
  //   loadComponent: () =>
  //     import('./student-dashboard.component/student-dashboard.component')
  //       .then((m) => m.StudentDashboardComponent),
  // },
  {
    path: 'teacher/grade-entry',
    title: 'Grade entry — MESIMS',
    loadComponent: () =>
      import('./grade-entry-list.component/grade-entry-list.component')
        .then((m) => m.GradeEntryListComponent),
  },
  // {
  //   path: 'teacher/advisory-status',
  //   title: 'Advisory status — MESIMS',
  //   loadComponent: () =>
  //     import('./advisory-status.component/advisory-status.component')
  //       .then((m) => m.AdvisoryStatusComponent),
  // },
];

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardShellComponent, NavItem } from '../../../../shared/components/dashboard-shell.component/dashboard-shell.component';

type GradeStatus = 'submitted' | 'pending';

interface SubjectLoad {
  readonly subjectName: string;
  readonly sectionName: string;
  readonly learnerCount: number;
  readonly status: GradeStatus;
  readonly routeId: string;
}

@Component({
  selector: 'app-grade-entry-list',
  imports: [DashboardShellComponent, RouterLink],
  templateUrl: './grade-entry-list.component.html',
  styleUrl: './grade-entry-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradeEntryListComponent {
  protected readonly navItems: readonly NavItem[] = [
    { icon: 'bi-grid', label: 'Dashboard', route: '/app/teacher/dashboard' },
  { icon: 'bi-journal-check', label: 'Grade entry', route: '/app/teacher/grade-entry' },
  { icon: 'bi-people', label: 'My classes', route: '/app/teacher/dashboard' },
  { icon: 'bi-calendar-check', label: 'Attendance', route: '/app/teacher/dashboard' },
  ];

  // TODO: replace with a real call once the API exists, e.g.
  // this.teacherAccountService.getSubjectLoads(currentTeacherId)
  // The backend must scope this query to the logged-in teacher —
  // this list should never include subjects the teacher does not teach.
  protected readonly subjectLoads: readonly SubjectLoad[] = [
    {
      subjectName: 'Mathematics',
      sectionName: 'Grade 3 — Sampaguita',
      learnerCount: 38,
      status: 'pending',
      routeId: 'math-sampaguita',
    },
    {
      subjectName: 'Mathematics',
      sectionName: 'Grade 3 — Rosal',
      learnerCount: 40,
      status: 'submitted',
      routeId: 'math-rosal',
    },
  ];
}

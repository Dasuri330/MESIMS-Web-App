import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardShellComponent, NavItem } from '../../../../shared/components/dashboard-shell.component/dashboard-shell.component';

interface ScheduleItem {
  readonly time: string;
  readonly subject: string;
  readonly section: string;
}

@Component({
  selector: 'app-teacher-dashboard',
  imports: [DashboardShellComponent],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherDashboardComponent {
 protected readonly navItems: readonly NavItem[] = [
  { icon: 'bi-grid', label: 'Dashboard', route: '/app/teacher/dashboard' },
  { icon: 'bi-journal-check', label: 'Grade entry', route: '/app/teacher/grade-entry' },
  { icon: 'bi-people', label: 'My classes', route: '/app/teacher/dashboard' },
  { icon: 'bi-calendar-check', label: 'Attendance', route: '/app/teacher/dashboard' },
];

  protected readonly schedule: readonly ScheduleItem[] = [
    { time: '7:30 AM', subject: 'Mathematics', section: 'Grade 3 — Sampaguita' },
    { time: '8:30 AM', subject: 'Science', section: 'Grade 3 — Sampaguita' },
    { time: '9:30 AM', subject: 'English', section: 'Grade 3 — Sampaguita' },
    { time: '1:00 PM', subject: 'MAPEH', section: 'Grade 3 — Rosal' },
  ];
}

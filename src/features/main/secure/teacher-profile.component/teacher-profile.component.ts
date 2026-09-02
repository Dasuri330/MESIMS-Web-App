import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  DashboardShellComponent,
  NavItem,
} from '../../../../shared/components/dashboard-shell.component/dashboard-shell.component';

@Component({
  selector: 'app-teacher-profile',
  imports: [DashboardShellComponent, ReactiveFormsModule],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherProfileComponent {
  private readonly fb = new FormBuilder();

  protected readonly userName = this.getUserName();

  protected readonly navItems: readonly NavItem[] = [
    { icon: 'bi-grid', label: 'Dashboard', route: '/app/teacher/dashboard' },
    { icon: 'bi-journal-check', label: 'Grade entry', route: '/app/teacher/grade-entry' },
    { icon: 'bi-people', label: 'My classes', route: '/app/teacher/dashboard' },
    { icon: 'bi-calendar-check', label: 'Attendance', route: '/app/teacher/dashboard' },
  ];

  protected readonly saved = signal(false);

  // Editable — the teacher owns this data.
  protected readonly form = this.fb.nonNullable.group({
    mobileNumber: ['0918 442 7719', [Validators.required]],
    email: ['elena.santos@gmail.com', [Validators.required, Validators.email]],
    houseStreet: ['24 Mabini Street', [Validators.required]],
    barangay: ['Poblacion', [Validators.required]],
    city: ['Makati City', [Validators.required]],
    emergencyContactName: ['Ramon Santos'],
    emergencyContactNumber: ['0917 208 3364'],
  });

  // Read-only — set by admin/registrar only.
  protected readonly credentials = {
    prcLicenseNumber: '1234567',
    prcValidUntil: '22 Mar 2028',
    employeeNumber: '0000512',
    employmentStatus: 'Permanent',
    position: 'Teacher I',
  };

  private getUserName(): string {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      return 'Teacher';
    }

    try {
      const user = JSON.parse(storedUser);

      return `${user.first_name} ${user.last_name}`.trim();
    } catch {
      return 'Teacher';
    }
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // TODO: replace with a real call, e.g.
    // this.teacherAccountService.updateOwnProfile(this.form.getRawValue())
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 3000);
  }
}

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  DashboardShellComponent,
  NavItem,
} from '../../../../shared/components/dashboard-shell.component/dashboard-shell.component';
import { AdminAccountService } from '../admin-account.service';

@Component({
  selector: 'app-create-account',
  imports: [DashboardShellComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountComponent {
  private readonly fb = new FormBuilder();
  private readonly router = inject(Router);
  private readonly accountService = inject(AdminAccountService);

  protected readonly navItems: readonly NavItem[] = [
    { icon: 'bi-grid', label: 'Dashboard', route: '/app/admin/dashboard' },
    { icon: 'bi-people', label: 'Manage accounts', route: '/app/admin/accounts' },
    { icon: 'bi-clipboard-check', label: 'Enrollment queue', route: '/app/admin/enrollment-queue' },
    { icon: 'bi-journal-text', label: 'Audit logs', route: '/app/admin/audit-logs' },
  ];

  protected readonly isSubmitting = signal(false);
  protected readonly submitError = signal<string | null>(null);
  protected readonly createdResult = signal<{ email: string; tempPassword: string } | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    role: ['', Validators.required],
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    middleName: [''],
    email: ['', [Validators.required, Validators.email]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitError.set(null);
    this.isSubmitting.set(true);

    const v = this.form.getRawValue();

    this.accountService
      .createLogin({
        role: v.role,
        firstName: v.firstName,
        middleName: v.middleName || null,
        lastName: v.lastName,
        email: v.email,
      })
      .subscribe({
        next: (res) => {
          this.isSubmitting.set(false);
          this.createdResult.set({ email: res.email, tempPassword: res.tempPassword });
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.submitError.set(
            err.status === 409
              ? 'This email is already in use.'
              : 'Something went wrong. Please try again.',
          );
        },
      });
  }

  protected doneViewingResult(): void {
    this.router.navigateByUrl('/app/admin/accounts');
  }
}

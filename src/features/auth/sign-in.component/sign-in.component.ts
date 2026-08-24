import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../../shared/components/footer.component/footer.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink, FooterComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  private readonly fb = new FormBuilder();
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  protected readonly isSubmitting = signal(false);
  protected readonly serverError = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false],
  });

  protected get email() {
    return this.form.controls.email;
  }

  protected get password() {
    return this.form.controls.password;
  }

  protected onSubmit(): void {
    this.serverError.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const { email, password } = this.form.getRawValue();

    function normalizeRole(displayRole: string): string {
    const map: Record<string, string> = {
      'Administrator': 'ADMIN',
      'Principal': 'PRINCIPAL',
      'Registrar': 'REGISTRAR',
      'Teacher': 'TEACHER',
      'Parent': 'PARENT',
      'Student': 'STUDENT',
    };
    return map[displayRole] ?? displayRole.toUpperCase();
  }

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
  this.isSubmitting.set(false);

  const normalizedRole = normalizeRole(response.user.role);

  localStorage.setItem('access_token', response.access_token);
  localStorage.setItem(
    'user',
    JSON.stringify({ ...response.user, role: normalizedRole }),
  );

  const dashboardPath =
    normalizedRole === 'ADMIN'
      ? '/app/admin/accounts'
      : `/app/${normalizedRole.toLowerCase()}/dashboard`;

  this.router.navigateByUrl(dashboardPath);
},

      error: (error) => {
        this.isSubmitting.set(false);

        console.error('Login error:', error);

        if (error.status === 401) {
          this.serverError.set('Incorrect email or password.');
        } else if (error.status === 0) {
          this.serverError.set(
            'Unable to connect to the server. Please make sure the API is running.'
          );
        } else {
          this.serverError.set(
            'Something went wrong. Please try again.'
          );
        }
      },
    });
  }
}

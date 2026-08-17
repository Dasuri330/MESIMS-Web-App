import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../../shared/components/footer.component/footer.component';

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

    // ============================================================
    // TEMPORARY — no backend yet.
    // This block fakes a successful login so the dashboard UI can
    // be previewed. DELETE this setTimeout block once AuthService
    // exists, and replace it with the commented-out block below.
    // ============================================================
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.router.navigateByUrl('/app/teacher/grade-entry');
    }, 600);

    // TODO: replace the block above with this once the API exists.
    // authService.login(this.form.getRawValue()).subscribe({
    //   next: (user) => {
    //     this.isSubmitting.set(false);
    //     const dashboardPath = `/app/${user.role.toLowerCase()}/dashboard`;
    //     this.router.navigateByUrl(dashboardPath);
    //   },
    //   error: () => {
    //     this.isSubmitting.set(false);
    //     this.serverError.set('Incorrect email or password.');
    //   },
    // });
  }
}

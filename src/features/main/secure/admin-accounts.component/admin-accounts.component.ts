import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import {
  DashboardShellComponent,
  NavItem,
} from '../../../../shared/components/dashboard-shell.component/dashboard-shell.component';
import { AdminAccountService, Account, Role, AccountStatus } from '../admin-account.service';

@Component({
  selector: 'app-admin-accounts',
  imports: [DashboardShellComponent, TableModule, TagModule],
  templateUrl: './admin-accounts.component.html',
  styleUrl: './admin-accounts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAccountsComponent implements OnInit {
  private readonly accountService = inject(AdminAccountService);
  private readonly router = inject(Router);

  protected readonly navItems: readonly NavItem[] = [
    { icon: 'bi-grid', label: 'Dashboard', route: '/app/admin/dashboard' },
    { icon: 'bi-people', label: 'Manage accounts', route: '/app/admin/accounts' },
    { icon: 'bi-clipboard-check', label: 'Enrollment queue', route: '/app/admin/enrollment-queue' },
    { icon: 'bi-journal-text', label: 'Audit logs', route: '/app/admin/audit-logs' },
  ];

  protected readonly accounts = signal<readonly Account[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly loadError = signal<string | null>(null);
  protected readonly isCreateDisabled = computed(() => this.activeFilter() === 'ALL');

  protected readonly activeFilter = signal<Role | 'ALL'>('ALL');

  protected readonly filteredAccounts = computed(() => {
    const filter = this.activeFilter();
    const all = this.accounts();
    return filter === 'ALL' ? all : all.filter((a) => a.role === filter);
  });

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts.set(accounts);
        this.isLoading.set(false);
      },
      error: () => {
        this.loadError.set('Unable to load accounts. Please try again.');
        this.isLoading.set(false);
      },
    });
  }

  protected setFilter(role: Role | 'ALL'): void {
    this.activeFilter.set(role);
  }

  protected createAccount(): void {
    this.router.navigateByUrl('/app/admin/accounts/create');
  }

  // TODO: wire to DELETE/PATCH /accounts/:id once the API exists.
  protected toggleStatus(id: number): void {
    this.accounts.update((list) =>
      list.map((a) =>
        a.id === id ? { ...a, status: a.status === 'active' ? 'suspended' : 'active' } : a,
      ),
    );
  }

  protected getRoleSeverity(role: Role): 'info' | 'success' | 'warn' {
    switch (role) {
      case 'TEACHER':
        return 'info';
      case 'PARENT':
        return 'success';
      case 'STUDENT':
        return 'warn';
    }
  }

  protected getStatusSeverity(status: AccountStatus): 'success' | 'danger' {
    return status === 'active' ? 'success' : 'danger';
  }
}

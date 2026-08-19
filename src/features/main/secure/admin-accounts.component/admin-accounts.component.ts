import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { DashboardShellComponent, NavItem } from '../../../../shared/components/dashboard-shell.component/dashboard-shell.component';

type Role = 'TEACHER' | 'PARENT' | 'STUDENT';
type AccountStatus = 'active' | 'suspended';

interface Account {
  readonly id: string;
  readonly name: string;
  readonly role: Role;
  readonly email: string;
  readonly status: AccountStatus;
}

@Component({
  selector: 'app-admin-accounts',
  imports: [DashboardShellComponent],
  templateUrl: './admin-accounts.component.html',
  styleUrl: './admin-accounts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAccountsComponent {
  protected readonly navItems: readonly NavItem[] = [
    { icon: 'bi-grid', label: 'Dashboard', route: '/app/admin/dashboard' },
    { icon: 'bi-people', label: 'Manage accounts', route: '/app/admin/accounts' },
    { icon: 'bi-clipboard-check', label: 'Enrollment queue', route: '/app/admin/dashboard' },
    { icon: 'bi-journal-text', label: 'Audit logs', route: '/app/admin/dashboard' },
  ];

  // TODO: replace with a real call, e.g. this.accountService.getAccounts()
  protected readonly accounts = signal<readonly Account[]>([
    { id: '1', name: 'Santos, Elena', role: 'TEACHER', email: 'esantos@meridian.edu.ph', status: 'active' },
    { id: '2', name: 'Ramos, Jose', role: 'TEACHER', email: 'jramos@meridian.edu.ph', status: 'active' },
    { id: '3', name: 'Dela Cruz, Rosario', role: 'PARENT', email: '', status: 'active' },
    { id: '4', name: 'Dela Cruz, Maria Isabel', role: 'STUDENT', email: '', status: 'active' },
    { id: '5', name: 'Bautista, Nora', role: 'TEACHER', email: 'nbautista@meridian.edu.ph', status: 'suspended' },
  ]);

  protected readonly activeFilter = signal<Role | 'ALL'>('ALL');

  protected readonly filteredAccounts = computed(() => {
    const filter = this.activeFilter();
    const all = this.accounts();
    return filter === 'ALL' ? all : all.filter((a) => a.role === filter);
  });

  protected setFilter(role: Role | 'ALL'): void {
    this.activeFilter.set(role);
  }

  // TODO: wire to DELETE/PATCH /accounts/:id once the API exists.
  // Deactivating (not deleting) preserves the audit trail — a
  // teacher's past submitted grades must remain attributable even
  // after their account is suspended.
  protected toggleStatus(id: string): void {
    this.accounts.update((list) =>
      list.map((a) =>
        a.id === id
          ? { ...a, status: a.status === 'active' ? 'suspended' : 'active' }
          : a,
      ),
    );
  }
}

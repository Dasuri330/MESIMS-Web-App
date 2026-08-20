import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavItem {
  readonly icon: string;
  readonly label: string;
  readonly route: string;
}

@Component({
  selector: 'app-dashboard-shell',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard-shell.component.html',
  styleUrl: './dashboard-shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardShellComponent {
  readonly roleLabel = input.required<string>();
  readonly userName = input.required<string>();
  readonly navItems = input.required<readonly NavItem[]>();
  readonly profileRoute = input<string>('');

  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}

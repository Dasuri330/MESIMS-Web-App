import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../../../shared/components/footer.component/footer.component';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  protected readonly schoolName = 'Meridian Elementary School';
}

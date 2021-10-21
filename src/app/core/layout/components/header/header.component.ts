import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../../shared/services/auth.service';
import { Destroy } from '../../../../shared/services/destroy.service';
import { SatelliteEntity } from '../../../models/satellite.interface';
import { SatelliteFacade } from '../../../store/satellite/satellite.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Destroy],
})
export class HeaderComponent {
  satelliteState$!: Observable<SatelliteEntity | null>;

  constructor(
    private readonly authService: AuthService,
    private readonly $destroy: Destroy,
    private readonly satelliteFacade: SatelliteFacade
  ) {
    this.satelliteState$ = satelliteFacade.satelliteState$.pipe(takeUntil($destroy));
  }

  logout = () => this.authService.logout();
}

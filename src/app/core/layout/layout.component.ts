import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Destroy } from '../../shared/services/destroy.service';
import { SettingsFacade } from '../store/settings/settings.facade';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [Destroy],
})
export class LayoutComponent implements OnInit {
  selectedTab$: Observable<'map' | 'report'>;

  constructor(private readonly $destroy: Destroy, private readonly settingsFacade: SettingsFacade) {
    this.selectedTab$ = this.settingsFacade.selectedTab$.pipe(takeUntil($destroy));
  }

  ngOnInit(): void {}
}

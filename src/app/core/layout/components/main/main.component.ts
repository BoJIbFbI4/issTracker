import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationPath } from '../../../models/navigation.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  LINKS = [
    { id: NavigationPath.Map, name: 'Map' },
    { id: NavigationPath.Report, name: 'Report' },
  ];
}

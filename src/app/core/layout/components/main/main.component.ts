import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
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

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  listenChanges = () => this.cdRef.markForCheck();
}

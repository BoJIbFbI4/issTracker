import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SatelliteEntity } from '../../../core/models/satellite.interface';
import { MainCardComponent } from '../main-card/main-card.component';

@Component({
  selector: 'app-save-location',
  templateUrl: './save-location-button.component.html',
  styleUrls: ['./save-location-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveLocationButtonComponent implements OnInit {
  @Input() satelliteState!: SatelliteEntity;

  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {}

  saveLocation = (satelliteState: SatelliteEntity) => this.dialog.open(MainCardComponent, { data: { satelliteState } });
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from '../../environments/environment';
import { SaveLocationButtonModule } from '../shared/ui/save-location-button/save-location-button.module';
import { MainBoardComponent } from './main-board.component';
import { MainBoardRouting } from './main-board.routing';
import { GenerateSatelliteLocationPipe } from './utils/generateSatelliteLocation.pipe';

@NgModule({
  declarations: [MainBoardComponent, GenerateSatelliteLocationPipe],
  imports: [
    CommonModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapboxToken,
    }),
    FlexModule,
    MainBoardRouting,
    SaveLocationButtonModule,
  ],
})
export class MainBoardModule {}

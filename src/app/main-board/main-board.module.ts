import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from '../../environments/environment';
import { MainBoardComponent } from './main-board.component';
import { MainBoardRouting } from './main-board.routing';

@NgModule({
  declarations: [MainBoardComponent],
  imports: [
    CommonModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapboxToken,
    }),
    FlexModule,
    MainBoardRouting,
  ],
})
export class MainBoardModule {}

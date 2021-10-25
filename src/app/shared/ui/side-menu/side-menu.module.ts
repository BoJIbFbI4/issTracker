import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CardPreviewModule } from '../card-preview/card-preview.module';
import { MainCardModule } from '../main-card/main-card.module';
import { SideMenuComponent } from './side-menu.component';

@NgModule({
  declarations: [SideMenuComponent],
  exports: [SideMenuComponent],
  imports: [
    CommonModule,
    CardPreviewModule,
    FlexModule,
    NgScrollbarModule,
    ScrollingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MainCardModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveComponentModule,
  ],
})
export class SideMenuModule {}

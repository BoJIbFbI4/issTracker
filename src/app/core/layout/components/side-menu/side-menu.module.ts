import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CardPreviewModule } from '../../../../shared/ui/card-preview/card-preview.module';
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
  ],
})
export class SideMenuModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CardPreviewComponent } from './card-preview.component';

@NgModule({
  declarations: [CardPreviewComponent],
  exports: [CardPreviewComponent],
  imports: [CommonModule, MatCardModule, FlexModule, MatDialogModule, MatIconModule],
})
export class CardPreviewModule {}

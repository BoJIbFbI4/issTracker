import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NewCardComponent } from './new-card.component';

@NgModule({
  declarations: [NewCardComponent],
  imports: [CommonModule, MatCardModule, FlexModule, MatIconModule, MatDialogModule],
  exports: [NewCardComponent],
})
export class NewCardModule {}

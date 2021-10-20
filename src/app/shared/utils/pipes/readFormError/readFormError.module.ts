import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NewCardComponent } from '../../../ui/new-card/new-card.component';
import { ReadErrorPipe } from './readError.pipe';

@NgModule({
  declarations: [ReadErrorPipe],
  imports: [CommonModule],
  exports: [ReadErrorPipe],
})
export class NewCardModule {}

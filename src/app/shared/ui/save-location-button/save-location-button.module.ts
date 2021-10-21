import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SaveLocationButtonComponent } from './save-location-button.component';

@NgModule({
  declarations: [SaveLocationButtonComponent],
  imports: [CommonModule, FlexModule, MatIconModule, MatDialogModule, MatButtonModule],
  exports: [SaveLocationButtonComponent],
})
export class SaveLocationButtonModule {}

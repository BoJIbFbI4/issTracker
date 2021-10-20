import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomSpinnerComponent } from './custom-spinner.component';
import { GetSpinnerSizePipe } from './utils/getSpinnerSize.pipe';

@NgModule({
  declarations: [CustomSpinnerComponent, GetSpinnerSizePipe],
  imports: [CommonModule, MatProgressSpinnerModule, FlexModule],
  exports: [CustomSpinnerComponent],
})
export class CustomSpinnerModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReadErrorPipe } from './readError.pipe';

@NgModule({
  declarations: [ReadErrorPipe],
  imports: [CommonModule],
  exports: [ReadErrorPipe],
})
export class NewCardModule {}

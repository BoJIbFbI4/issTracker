import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReportBoardComponent } from './report-board.component';
import { ReportBoardRouting } from './report-board.routing';

@NgModule({
  declarations: [ReportBoardComponent],
  imports: [CommonModule, ReportBoardRouting],
})
export class ReportBoardModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ReportBoardComponent } from './report-board.component';
import { ReportBoardRouting } from './report-board.routing';

@NgModule({
  declarations: [ReportBoardComponent],
  imports: [CommonModule, ReportBoardRouting, MatTableModule, FlexModule, ReactiveComponentModule, NgScrollbarModule],
})
export class ReportBoardModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportBoardComponent } from './report-board.component';

const routes: Routes = [
  {
    path: '',
    component: ReportBoardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportBoardRouting {}

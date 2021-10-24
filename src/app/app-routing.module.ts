import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { LayoutModule } from './core/layout/layout.module';
import { NavigationPath } from './core/models/navigation.interface';
import { AuthGuard } from './shared/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: NavigationPath.Home,
    component: LayoutComponent,
    canActivate: [AuthGuard],

    children: [
      { path: '', pathMatch: 'full', redirectTo: NavigationPath.Map },

      {
        path: NavigationPath.Map,
        data: { id: NavigationPath.Map },
        loadChildren: (): Promise<any> => import('./main-board/main-board.module').then((modules) => modules.MainBoardModule),
      },
      {
        path: NavigationPath.Report,
        data: { id: NavigationPath.Report },
        loadChildren: (): Promise<any> => import('./report-board/report-board.module').then((modules) => modules.ReportBoardModule),
      },
    ],
  },
  {
    path: NavigationPath.Login,
    loadChildren: (): Promise<any> => import('./login/login.module').then((modules) => modules.LoginModule),
  },
  { path: '**', redirectTo: NavigationPath.Map },
  /*ADD NOT FOUND PAGE etc...*/
  // {
  //   path: '**',
  // loadChildren: (): Promise<any> => import().then((modules) => modules.NotFoundPageModule),
  // },
];

@NgModule({
  imports: [
    LayoutModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

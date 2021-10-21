import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideMenuModule } from '../../shared/ui/side-menu/side-menu.module';
import { MainModule } from './components/main/main.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, MainModule, FlexModule, MatSidenavModule, SideMenuModule],
})
export class LayoutModule {}

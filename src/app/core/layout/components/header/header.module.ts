import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveComponentModule } from '@ngrx/component';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [MatToolbarModule, FlexLayoutModule, MatButtonModule, MatIconModule, MatTooltipModule, CommonModule, ReactiveComponentModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login.component';
import { LoginRouting } from './login.routing';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRouting, MatButtonModule, FlexModule],
})
export class LoginModule {}

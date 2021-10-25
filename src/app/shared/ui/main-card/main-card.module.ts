import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveComponentModule } from '@ngrx/component';
import { NewCardModule } from '../../utils/pipes/readFormError/readFormError.module';
import { CustomSpinnerModule } from '../custom-spinner/custom-spinner.module';
import { MainCardComponent } from './main-card.component';

@NgModule({
  declarations: [MainCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TextFieldModule,
    ReactiveFormsModule,
    NewCardModule,
    MatSnackBarModule,
    MatDividerModule,
    MatDialogModule,
    CustomSpinnerModule,
    ReactiveComponentModule,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: <MatDialogConfig>{
        id: 'cardModal',
        hasBackdrop: true,
        autoFocus: true,
        closeOnNavigation: true,
        disableClose: false,
        panelClass: 'cardDialog',
        minWidth: '33%',
        maxHeight: '50%',
        maxWidth: '50%',
        height: 'fit-content',
        width: 'fit-content',
      },
    },
  ],
  entryComponents: [MainCardComponent],
})
export class MainCardModule {}

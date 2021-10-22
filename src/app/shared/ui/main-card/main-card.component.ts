import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CardEntity } from '../../../core/models/card.model';
import { SatelliteEntity } from '../../../core/models/satellite.interface';
import { CardFacade } from '../../../core/store/card/card.facade';
import { Destroy } from '../../services/destroy.service';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss'],
  viewProviders: [Destroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainCardComponent implements OnInit, AfterViewInit, OnDestroy {
  cardList$!: Observable<CardEntity[]>;
  selectCardCreateRun$!: Observable<boolean>;
  cardList!: CardEntity[];

  nameControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(30),
    Validators.minLength(1),
    Validators.nullValidator,
    this.uniqueNameValidator(),
  ]);

  constructor(
    private readonly dialogRef: MatDialogRef<MainCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { satelliteState: SatelliteEntity } | undefined,
    private readonly _fb: FormBuilder,
    private readonly cardFacade: CardFacade,
    private readonly $destroy: Destroy
  ) {
    this.cardList$ = this.cardFacade.cards$.pipe(takeUntil($destroy));
    this.selectCardCreateRun$ = this.cardFacade.selectCardCreateRun$.pipe(takeUntil($destroy));
  }

  onPost = (): void => {
    const newCard: CardEntity = {
      satelliteState: this.data?.satelliteState,
      name: this.nameControl.value,
      create_time: new Date().toISOString(),
      id: <number>this.data?.satelliteState.timestamp,
    };
    return this.cardFacade.addCard(newCard);
  };

  ngOnInit(): void {
    this.cardList$.pipe(tap((cards) => (this.cardList = cards))).subscribe();
  }

  ngAfterViewInit(): void {}

  uniqueNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      _.some(this.cardList, { name: control.value }) ? { uniqueType: { value: control.value } } : null;
  }

  ngOnDestroy(): void {}
}

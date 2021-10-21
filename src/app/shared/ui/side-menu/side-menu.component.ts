import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CardEntity } from '../../../core/models/card.model';
import { CardFacade } from '../../../core/store/board/card.facade';
import { Destroy } from '../../services/destroy.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [Destroy],
})
export class SideMenuComponent implements OnInit {
  cards$: Observable<CardEntity[]>;
  filterControl: FormControl = new FormControl('');

  constructor(
    private readonly cardFacade: CardFacade,
    private readonly $destroy: Destroy,
    private readonly matSnackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) {
    this.cards$ = cardFacade.cards$.pipe(takeUntil(this.$destroy));
  }

  ngOnInit(): void {
    this.cardFacade.cardRemoved$
      .pipe(
        tap(() => {
          this.matSnackBar.open('Card removed', '', { duration: 3000 });
        }),
        takeUntil(this.$destroy)
      )
      .subscribe();

    this.cardFacade.cardAdded$
      .pipe(
        tap(() => {
          this.matSnackBar.open('Card created success', '', { duration: 3000 });
          this.dialog.getDialogById('cardModal') && this.dialog.closeAll();
        }),
        takeUntil(this.$destroy)
      )
      .subscribe();
  }
}

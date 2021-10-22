import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, first, takeUntil, tap } from 'rxjs/operators';
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
export class SideMenuComponent implements OnInit, AfterViewInit {
  cards$: Observable<CardEntity[]>;
  selectedCard$: Observable<CardEntity | undefined>;
  lastRemovedCard$: Observable<CardEntity | undefined>;
  filterControl: FormControl = new FormControl('');
  lastRemovedCard: CardEntity | undefined;
  cardAdded$: Observable<CardEntity>;
  cardRemoved$: Observable<CardEntity>;

  constructor(
    private readonly cardFacade: CardFacade,
    private readonly $destroy: Destroy,
    private readonly matSnackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.cards$ = cardFacade.filteredCards$.pipe(takeUntil(this.$destroy));
    this.selectedCard$ = cardFacade.selectedCard$.pipe(takeUntil(this.$destroy));
    this.lastRemovedCard$ = cardFacade.lastRemovedCard$.pipe(takeUntil(this.$destroy));
    this.cardAdded$ = cardFacade.cardAdded$.pipe(takeUntil(this.$destroy));
    this.cardRemoved$ = cardFacade.cardRemoved$.pipe(takeUntil(this.$destroy));
  }

  @HostListener('document:keydown.control.z', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.revertCard();
    event.preventDefault();
  }

  ngOnInit(): void {
    this.filterControl.valueChanges
      .pipe(
        debounceTime(222),
        tap((filter) =>
          this.router
            .navigate([], { queryParams: { filter: !!filter?.length ? filter : null }, queryParamsHandling: 'merge' })
            .then(() => this.cardFacade.cardFilter(filter))
        )
      )
      .subscribe();

    this.lastRemovedCard$.pipe(tap((card) => (this.lastRemovedCard = card))).subscribe();

    this.cardRemoved$
      .pipe(
        tap(() => {
          this.matSnackBar
            .open('Card removed', 'Undo', { duration: 5000 })
            .onAction()
            .pipe(tap(() => this.revertCard()))
            .subscribe();
        })
      )
      .subscribe();

    this.cardAdded$
      .pipe(
        tap(() => {
          this.matSnackBar.open('Card created success', '', { duration: 3000 });
          this.dialog.getDialogById('cardModal') && this.dialog.closeAll();
        })
      )
      .subscribe();
  }

  revertCard = () => this.cardFacade.addCard(<CardEntity>this.lastRemovedCard);

  ngAfterViewInit(): void {
    combineLatest([this.route.queryParams, this.cards$])
      .pipe(
        // filter<any>(Boolean),
        first(),
        tap(([params, cards]: [any, CardEntity[]]) => {
          params?.timestamp && this.cardFacade.selectCard(_.find(cards, { id: +params.timestamp }));
          this.filterControl.setValue(params.filter || '');
        })
      )
      .subscribe();
  }
}

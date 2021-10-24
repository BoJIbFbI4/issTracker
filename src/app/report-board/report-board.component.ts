import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CardEntity } from '../core/models/card.model';
import { CardFacade } from '../core/store/card/card.facade';
import { Destroy } from '../shared/services/destroy.service';

@Component({
  selector: 'app-report-board',
  templateUrl: './report-board.component.html',
  styleUrls: ['./report-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [Destroy],
})
export class ReportBoardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'date', 'latitude', 'longitude'];
  cards$: Observable<CardEntity[]>;

  constructor(private readonly $destroy: Destroy, private readonly cardFacade: CardFacade) {
    this.cards$ = cardFacade.filteredCards$.pipe(takeUntil(this.$destroy));
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}

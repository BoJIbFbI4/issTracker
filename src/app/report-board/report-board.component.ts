import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Destroy } from '../shared/services/destroy.service';

@Component({
  selector: 'app-main-board',
  templateUrl: './report-board.component.html',
  styleUrls: ['./report-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [Destroy],
})
export class ReportBoardComponent implements OnInit, AfterViewInit {
  constructor(private readonly $destroy: Destroy) {}

  ngOnInit(): void {
    // this.cards$.pipe(tap((c) => console.warn(c))).subscribe();
  }

  ngAfterViewInit(): void {
    /*  this.route.queryParams
				.pipe(
					takeUntil(this.$destroy),
					take(1),
					// first((params) => !!params?.id),
					withLatestFrom(this.cards$),
					map(([{ id }, cards]) => <CardEntity>_.find(cards, { id: +id })),
					tap((card: CardEntity) =>
						!!card
							? this.dialog.open(MainCardComponent, {
									data: {
										card,
									},
								})
							: this.router.navigate([], { queryParamsHandling: '' })
					)
				)
				.subscribe();*/
  }
}

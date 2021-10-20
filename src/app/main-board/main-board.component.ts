import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LineLayout, Map, SymbolLayout, SymbolPaint, Transition } from 'mapbox-gl';
import { BehaviorSubject } from 'rxjs';
import { Destroy } from '../shared/services/destroy.service';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [Destroy],
})
export class MainBoardComponent implements OnInit, AfterViewInit {
  mainMapBox!: Map;
  PICKED_FEATURE_COLOR = 'rgba(241,90,37, .75)';
  TRANSITION: Transition = { delay: 0, duration: 555 };
  textLayout: SymbolLayout = {
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
    'text-anchor': 'center',
    'icon-anchor': 'bottom',
    'text-justify': 'center',
    'text-allow-overlap': true,
    'symbol-avoid-edges': true,
    'icon-allow-overlap': true,
  };
  symbolPaint: SymbolPaint = {
    'icon-opacity': 1,
    'text-opacity': 1,
    'icon-halo-width': 160,
    'icon-halo-blur': 160,
    'icon-halo-color': this.PICKED_FEATURE_COLOR,
    'icon-halo-blur-transition': this.TRANSITION,
    'icon-color-transition': this.TRANSITION,
    'icon-opacity-transition': this.TRANSITION,
    'icon-translate-transition': this.TRANSITION,
    'icon-halo-width-transition': this.TRANSITION,
  };
  lineLayout: LineLayout = {
    visibility: 'visible',
    'line-cap': 'round',
    'line-join': 'round',
  };
  droneSymbolLayout: SymbolLayout = {
    ...this.textLayout,
    'icon-image': 'drone',
    'icon-size': 1,
    'icon-anchor': 'center',
    'icon-rotate': ['get', 'heading'] || 0,
  };
  VOD_LIGHT_TRAJECTORY = 'rgba(204,204,204,.8)';
  VOD_DARK_TRAJECTORY = 'rgba(34,34,34,.8)';
  imageLoaded = false;
  // nearestMarker!: Feature<Point> | any;
  cursorStyle$: BehaviorSubject<string> = new BehaviorSubject('');

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

  initMainMap(mapbox: Map) {
    this.mainMapBox = mapbox;

    // .on('render', () => this.debouncedResize())
    mapbox.triggerRepaint();
    this.subscribes();
  }

  subscribes() {}
}

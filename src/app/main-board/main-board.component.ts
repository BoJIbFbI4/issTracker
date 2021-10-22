import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LineLayout, LngLatLike, Map, SymbolLayout, SymbolPaint, Transition } from 'mapbox-gl';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { CardEntity } from '../core/models/card.model';
import { SatelliteEntity } from '../core/models/satellite.interface';
import { CardFacade } from '../core/store/card/card.facade';
import { SatelliteFacade } from '../core/store/satellite/satellite.facade';
import { SettingsFacade } from '../core/store/settings/settings.facade';
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

  satelliteImgLoaded = false;
  // nearestMarker!: Feature<Point> | any;
  cursorStyle$: BehaviorSubject<string> = new BehaviorSubject('');
  satelliteState$!: Observable<SatelliteEntity | null>;
  satelliteLocation$!: Observable<LngLatLike | undefined>;
  REQUEST_TIMEOUT = 2000;
  SATELLITE_ICON = 'assets/icons/satellite.png';
  selectedCard$: Observable<CardEntity | undefined>;
  isCardSelected!: boolean;
  center: LngLatLike = [0, 0];
  rtLocation!: LngLatLike;

  constructor(
    private readonly $destroy: Destroy,
    private readonly satelliteFacade: SatelliteFacade,
    private readonly cardFacade: CardFacade,
    private readonly settingsFacade: SettingsFacade,
    private readonly router: Router
  ) {
    this.satelliteState$ = satelliteFacade.satelliteState$.pipe(takeUntil($destroy));
    this.satelliteLocation$ = satelliteFacade.satelliteLocation$.pipe(takeUntil($destroy));
    this.selectedCard$ = cardFacade.selectedCard$.pipe(takeUntil($destroy));
  }

  ngOnInit(): void {
    this.settingsFacade.setSelectedTab('map');
    // this.cards$.pipe(tap((c) => console.warn(c))).subscribe();
  }

  ngAfterViewInit(): void {}

  initMainMap(mapbox: Map) {
    this.mainMapBox = mapbox;

    // .on('render', () => this.debouncedResize())
    mapbox.triggerRepaint();
    this.subscribes();
  }

  subscribes() {
    interval(this.REQUEST_TIMEOUT)
      .pipe(tap(() => this.satelliteFacade.requestSatelliteState()))
      .subscribe();

    this.selectedCard$
      .pipe(
        // tap((card: CardEntity | undefined) => this.router.navigate([], { queryParams: { id: card?.id }, queryParamsHandling: 'merge' })),
        tap((card: CardEntity | undefined) => {
          this.isCardSelected = !!card;
          this.center = !!card
            ? [+card.satelliteState!.iss_position.longitude, +card.satelliteState!.iss_position.latitude]
            : this.rtLocation;
        })
      )
      .subscribe();

    this.satelliteLocation$
      .pipe(
        filter<any>(Boolean),
        tap((center: LngLatLike) => (!this.isCardSelected ? (this.center = center) : (this.rtLocation = center)))
      )
      .subscribe();
  }
}

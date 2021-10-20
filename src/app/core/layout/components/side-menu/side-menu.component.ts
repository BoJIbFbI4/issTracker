import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Destroy } from '../../../../shared/services/destroy.service';
import { CardEntity } from '../../../models/card.model';
import { BoardFacade } from '../../../store/board/board.facade';

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

  constructor(private readonly boardFacade: BoardFacade, private readonly $destroy: Destroy) {
    this.cards$ = boardFacade.cards$.pipe(takeUntil(this.$destroy));
  }

  ngOnInit(): void {}
}

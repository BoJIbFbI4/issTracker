import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardEntity } from '../../../core/models/card.model';
import { CardFacade } from '../../../core/store/board/card.facade';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPreviewComponent implements OnInit {
  @Input() card!: CardEntity;

  constructor(private readonly dialog: MatDialog, private readonly router: Router, private readonly cardFacade: CardFacade) {}

  ngOnInit(): void {}

  selectCard = (card: CardEntity) => {};
  requestDelete = () => this.cardFacade.removeCard(<CardEntity>this.card);
}

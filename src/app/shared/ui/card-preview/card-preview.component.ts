import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardEntity } from '../../../core/models/card.model';
import { CardFacade } from '../../../core/store/card/card.facade';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPreviewComponent implements OnInit {
  @Input() card!: CardEntity;
  @Input() selectedCardId!: number;

  constructor(private readonly dialog: MatDialog, private readonly router: Router, private readonly cardFacade: CardFacade) {}

  ngOnInit(): void {}

  selectCard = (card: CardEntity) =>
    this.router.navigate([], {
      queryParams: { id: this.selectedCardId !== card.id ? card?.id : null },
      queryParamsHandling: 'merge',
    });

  requestDelete = (card: CardEntity) => {
    this.selectedCardId === card.id &&
      this.router.navigate([], {
        queryParams: { id: null },
        queryParamsHandling: 'merge',
      });
    this.cardFacade.removeCard(card);
  };
}

import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StoreModule } from '@ngrx/store';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CardFacade } from '../../../core/store/card/card.facade';
import { CardPreviewModule } from '../card-preview/card-preview.module';
import { MainCardModule } from '../main-card/main-card.module';

import { SideMenuComponent } from './side-menu.component';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideMenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [CardFacade],
      imports: [
        CommonModule,
        CardPreviewModule,
        FlexModule,
        NgScrollbarModule,
        ScrollingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MainCardModule,
        MatIconModule,
        MatTooltipModule,
        StoreModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

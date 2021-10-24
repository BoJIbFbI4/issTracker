import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';

import { MainModule } from './main.module';

describe('MainModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CommonModule, MainModule, MatTabsModule, HeaderModule, RouterModule],
    }).compileComponents();
  });

  it('should create', () => {
    expect(MainModule).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';

import { AppRoutingModule } from './app-routing.module';

describe('AppRoutingModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [AppRoutingModule],
    }).compileComponents();
  });

  it('should create', () => {
    expect(AppRoutingModule).toBeTruthy();
  });
});

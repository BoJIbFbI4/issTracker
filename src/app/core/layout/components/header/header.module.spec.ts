import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';

import { HeaderModule } from './header.module';

describe('HeaderModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HeaderModule],
    }).compileComponents();
  });

  it('should create', () => {
    expect(HeaderModule).toBeTruthy();
  });
});

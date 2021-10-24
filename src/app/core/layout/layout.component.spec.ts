import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SideMenuModule } from '../../shared/ui/side-menu/side-menu.module';
import { reducer, SETTINGS_FEATURE_KEY } from '../store/settings/settings.reducer';
import { MainModule } from './components/main/main.module';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        CommonModule,
        MainModule,
        FlexModule,
        MatSidenavModule,
        SideMenuModule,
        StoreModule.forFeature(SETTINGS_FEATURE_KEY, reducer),
        EffectsModule.forFeature([]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

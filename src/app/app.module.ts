import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardStateModule } from './core/store/board/card-state.module';
import { SatelliteStateModule } from './core/store/satellite/satellite-state.module';
import { SettingsStateModule } from './core/store/settings/settings-state.module';
import { SaveLocationButtonModule } from './shared/ui/save-location-button/save-location-button.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }
    ),
    SatelliteStateModule,
    SettingsStateModule,
    CardStateModule,
    SaveLocationButtonModule,
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument({ logOnly: environment.production }) : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
